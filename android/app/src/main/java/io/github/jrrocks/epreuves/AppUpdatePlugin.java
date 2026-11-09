package io.github.jrrocks.epreuves;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.SystemClock;
import android.provider.Settings;
import androidx.activity.result.ActivityResult;
import androidx.core.content.FileProvider;
import androidx.core.content.pm.PackageInfoCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Updates the app from its GitHub release. The page finds a newer version there (src/lib/appUpdate.ts),
 * then this plugin downloads its APK into the cache, checks it and hands it to Android's installer,
 * which installs it over this one: same package, same signing key, so the progress is kept.
 *
 * The APK is checked before the installer sees it: its SHA-256 against the digest that GitHub gives for
 * the asset, then its package and its version, which must be this app's and newer than the installed
 * one. Installing needs the learner's consent once (« Installer des applis inconnues » for this app),
 * then their confirmation at every update: Android asks both, this plugin only opens the screens.
 */
@CapacitorPlugin(name = "AppUpdate")
public class AppUpdatePlugin extends Plugin {

    private static final String APK_TYPE = "application/vnd.android.package-archive";

    /** Downloads run on a thread of their own: plugin calls share one thread, which they would block. */
    private final ExecutorService downloads = Executors.newSingleThreadExecutor();
    private final AtomicBoolean downloading = new AtomicBoolean(false);
    private volatile boolean cancelled = false;

    private File folder() {
        return new File(getContext().getCacheDir(), "updates");
    }

    private File apk() {
        return new File(folder(), "Epreuves.apk");
    }

    /** The file being downloaded: named .apk too, so that Android reads it as one when it is checked. */
    private File partial() {
        return new File(folder(), "Epreuves.part.apk");
    }

    /**
     * An APK left in the cache by an update since installed, or by an older download, is 4 MB for
     * nothing: dropped at launch. One newer than the app is kept: Android may have stopped the app while
     * the learner allowed it to install updates, and the download then serves again.
     * On Android an exception left uncaught on any thread closes the app: none leaves this one.
     */
    @Override
    public void load() {
        downloads.execute(() -> {
            try {
                partial().delete();
                if (apk().exists() && newerVersion(apk()) == null) apk().delete();
            } catch (RuntimeException ignored) {
                // A cache that cannot be cleaned now is cleaned at the next download.
            }
        });
    }

    /** Whether the learner allows this app to install updates (Settings, « Installer des applis inconnues »). */
    @PluginMethod
    public void canInstall(PluginCall call) {
        call.resolve(allowed());
    }

    /** Opens this app's « Installer des applis inconnues » setting; resolves when the learner comes back. */
    @PluginMethod
    public void openInstallSettings(PluginCall call) {
        Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getContext().getPackageName()));
        try {
            startActivityForResult(call, intent, "installSettingsClosed");
        } catch (RuntimeException e) {
            call.reject("Ce téléphone n’ouvre pas ce réglage : Paramètres, Applis, Accès spéciaux, Installer des applis inconnues.", "NO_SETTINGS", e);
        }
    }

    @ActivityCallback
    private void installSettingsClosed(PluginCall call, ActivityResult result) {
        if (call != null) call.resolve(allowed());
    }

    /**
     * Downloads the APK at `url` (the release asset's address) into the cache, sending
     * `downloadProgress` events ({ loaded, total } in bytes), then checks it: `digest`, when given, is
     * the asset's « sha256:… » from GitHub. Resolves with the version it holds. An APK already
     * downloaded and checked for the same digest is not downloaded again.
     */
    @PluginMethod
    public void download(PluginCall call) {
        String url = call.getString("url");
        String digest = call.getString("digest");
        if (url == null || !url.startsWith("https://")) {
            call.reject("Adresse de téléchargement invalide.", "BAD_URL");
            return;
        }
        if (!downloading.compareAndSet(false, true)) {
            call.reject("Un téléchargement est déjà en cours.", "BUSY");
            return;
        }
        cancelled = false;
        downloads.execute(() -> {
            try {
                PackageInfo ready = apk().exists() && digest != null && digest.equals(sha256(apk())) ? newerVersion(apk()) : null;
                call.resolve(version(ready != null ? ready : fetch(url, digest)));
            } catch (Refused e) {
                call.reject(e.getMessage(), e.code);
            } catch (Exception e) {
                // Any other failure, a runtime one included: on this thread it would close the app.
                partial().delete();
                if (cancelled) call.reject("Téléchargement annulé.", "CANCELLED");
                else call.reject("Le téléchargement s’est interrompu (" + e.getMessage() + ").", "NETWORK", e);
            } finally {
                downloading.set(false);
            }
        });
    }

    /** A download that arrived whole but is not the expected update: not worth trying again as is. */
    private static final class Refused extends IOException {

        final String code;

        Refused(String code, String message) {
            super(message);
            this.code = code;
        }
    }

    /** Stops the download in progress: its call rejects with « CANCELLED ». */
    @PluginMethod
    public void cancel(PluginCall call) {
        cancelled = true;
        call.resolve();
    }

    /** Hands the downloaded APK to Android's installer, which asks the learner to confirm. */
    @PluginMethod
    public void install(PluginCall call) {
        File file = apk();
        if (!file.exists() || newerVersion(file) == null) {
            call.reject("Aucune mise à jour téléchargée.", "NO_UPDATE");
            return;
        }
        if (!getContext().getPackageManager().canRequestPackageInstalls()) {
            call.reject("Android n’autorise pas encore cette app à installer ses mises à jour.", "NOT_ALLOWED");
            return;
        }
        try {
            Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", file);
            Intent intent = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, APK_TYPE).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(intent);
            call.resolve();
        } catch (ActivityNotFoundException e) {
            call.reject("Aucun installeur d’applications sur ce téléphone.", "NO_INSTALLER", e);
        } catch (RuntimeException e) {
            call.reject("Android n’a pas pu ouvrir l’installeur.", "NO_INSTALLER", e);
        }
    }

    /**
     * Downloads to a partial file, checks it, then names it as the update. Throws {@link Refused} when
     * the file is not the expected update, another IOException when the download itself fails.
     */
    private PackageInfo fetch(String address, String digest) throws IOException {
        File dir = folder();
        if (!dir.isDirectory() && !dir.mkdirs()) throw new IOException("cache inaccessible");
        apk().delete();
        File part = partial();
        HttpURLConnection connection = (HttpURLConnection) new URL(address).openConnection();
        connection.setConnectTimeout(15_000);
        connection.setReadTimeout(30_000);
        MessageDigest sha;
        try {
            sha = MessageDigest.getInstance("SHA-256");
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IOException(e);
        }
        try {
            int status = connection.getResponseCode();
            if (status != HttpURLConnection.HTTP_OK) throw new IOException("HTTP " + status);
            long total = connection.getContentLengthLong();
            long loaded = 0;
            long sent = 0;
            try (InputStream in = connection.getInputStream(); OutputStream out = new FileOutputStream(part)) {
                byte[] buffer = new byte[64 * 1024];
                int n;
                while ((n = in.read(buffer)) != -1) {
                    if (cancelled) throw new IOException("annulé");
                    out.write(buffer, 0, n);
                    sha.update(buffer, 0, n);
                    loaded += n;
                    long now = SystemClock.uptimeMillis();
                    if (now - sent >= 200) {
                        progress(loaded, total);
                        sent = now;
                    }
                }
            }
            progress(loaded, total);
        } finally {
            connection.disconnect();
        }
        if (digest != null && !digest.equals("sha256:" + hex(sha.digest()))) {
            part.delete();
            throw new Refused("CORRUPT", "Le fichier reçu ne correspond pas à celui publié sur GitHub.");
        }
        PackageInfo info = newerVersion(part);
        if (info == null) {
            part.delete();
            throw new Refused("NOT_NEWER", "Le fichier publié n’est pas une version plus récente de cette app.");
        }
        if (!part.renameTo(apk())) throw new IOException("cache inaccessible");
        return info;
    }

    private void progress(long loaded, long total) {
        JSObject data = new JSObject();
        data.put("loaded", loaded);
        data.put("total", total);
        notifyListeners("downloadProgress", data);
    }

    /** The APK's package info if it is this app in a newer version than the installed one, else null. */
    private PackageInfo newerVersion(File file) {
        PackageManager pm = getContext().getPackageManager();
        String path = file.getAbsolutePath();
        PackageInfo archive = Build.VERSION.SDK_INT >= 33
            ? pm.getPackageArchiveInfo(path, PackageManager.PackageInfoFlags.of(0))
            : pm.getPackageArchiveInfo(path, 0);
        if (archive == null || !getContext().getPackageName().equals(archive.packageName)) return null;
        try {
            PackageInfo installed = Build.VERSION.SDK_INT >= 33
                ? pm.getPackageInfo(getContext().getPackageName(), PackageManager.PackageInfoFlags.of(0))
                : pm.getPackageInfo(getContext().getPackageName(), 0);
            return PackageInfoCompat.getLongVersionCode(archive) > PackageInfoCompat.getLongVersionCode(installed) ? archive : null;
        } catch (PackageManager.NameNotFoundException e) {
            return null;
        }
    }

    private JSObject allowed() {
        JSObject result = new JSObject();
        result.put("allowed", getContext().getPackageManager().canRequestPackageInstalls());
        return result;
    }

    private static JSObject version(PackageInfo info) {
        JSObject result = new JSObject();
        result.put("versionName", info.versionName);
        result.put("versionCode", PackageInfoCompat.getLongVersionCode(info));
        return result;
    }

    private static String sha256(File file) throws IOException {
        try (InputStream in = new java.io.FileInputStream(file)) {
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            byte[] buffer = new byte[64 * 1024];
            int n;
            while ((n = in.read(buffer)) != -1) sha.update(buffer, 0, n);
            return "sha256:" + hex(sha.digest());
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IOException(e);
        }
    }

    private static String hex(byte[] bytes) {
        StringBuilder s = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) s.append(String.format(Locale.ROOT, "%02x", b));
        return s.toString();
    }
}
