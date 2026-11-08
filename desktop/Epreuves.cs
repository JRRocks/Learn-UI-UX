// Épreuves for Windows: one .exe that holds the whole app (dist/, zipped as a resource), serves it on
// http://localhost and opens it in a window of its own. Built by desktop/build.ps1 with the C# 5
// compiler that comes with Windows (.NET Framework 4.x): nothing to install, neither to build it nor
// to run it.
//
// The window is a Chromium browser (Edge, Chrome, Brave or Vivaldi) in app mode, on a profile of its
// own in %LOCALAPPDATA%\Epreuves: the progress (localStorage of http://localhost:47815) is found again
// at every launch, apart from the learner's own browsing. The .exe quits when that window closes.
// With no such browser, the default browser opens the app in a tab, and a small window keeps the
// server running until the learner closes it.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

[assembly: AssemblyTitle("Épreuves — atelier UI/UX")]
[assembly: AssemblyProduct("Épreuves")]

static class Program
{
    // Always the same port, so always the same origin: the progress saved by the app depends on it.
    const int Port = 47815;
    const string Title = "Épreuves";

    static readonly string Home = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Epreuves");

    static Dictionary<string, byte[]> site;

    [DllImport("user32.dll")]
    static extern bool SetProcessDPIAware();

    [STAThread]
    static void Main()
    {
        SetProcessDPIAware();
        Application.EnableVisualStyles();
        try
        {
            Run();
        }
        catch (Exception e)
        {
            MessageBox.Show("Épreuves n’a pas pu démarrer.\n\n" + e.Message, Title,
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    static void Run()
    {
        Directory.CreateDirectory(Home);
        string portFile = Path.Combine(Home, "port");
        bool first;
        using (new Mutex(true, @"Local\Epreuves-atelier-UI-UX", out first))
        {
            if (!first)
            {
                // Already running: one more window on the same server.
                Open(Url(ReadPort(portFile)), false);
                return;
            }
            site = LoadSite();
            int port;
            HttpListener listener = Listen(out port);
            File.WriteAllText(portFile, port.ToString());
            new Thread(() => Serve(listener)) { IsBackground = true }.Start();
            Open(Url(port), true);
        }
    }

    static string Url(int port)
    {
        return "http://localhost:" + port + "/";
    }

    /// <summary>Opens a window of the app; with <paramref name="wait"/>, returns once it is closed.</summary>
    static void Open(string url, bool wait)
    {
        Browser browser = PickBrowser();
        if (browser == null)
        {
            Process.Start(url);
            if (wait) Application.Run(KeepAliveWindow(url));
            return;
        }
        string profile = Path.Combine(Home, browser.Name);
        // In French, like the app: no offer to translate it, and French menus and spell checking.
        string args = Quote("--app=" + url) + " " + Quote("--user-data-dir=" + profile) +
            " --lang=fr --no-first-run --no-default-browser-check --disable-search-engine-choice-screen";
        // First launch only: afterwards the browser restores the size the learner gave the window.
        if (!Directory.Exists(profile)) args += " --window-size=1280,860";
        Process process = Process.Start(new ProcessStartInfo(browser.Exe, args) { UseShellExecute = false });
        if (!wait) return;
        process.WaitForExit();
        // The process may have handed the window over to a browser already running on this profile
        // (left open by an earlier launch, or relaunched by an update): wait for that one too.
        string lockFile = Path.Combine(profile, "lockfile");
        while (InUse(lockFile)) Thread.Sleep(2000);
    }

    /// <summary>A running Chromium holds the lockfile of its profile open for writing.</summary>
    static bool InUse(string lockFile)
    {
        if (!File.Exists(lockFile)) return false;
        try
        {
            using (File.Open(lockFile, FileMode.Open, FileAccess.Read, FileShare.Read)) return false;
        }
        catch (IOException)
        {
            return true;
        }
        catch (UnauthorizedAccessException)
        {
            return true;
        }
    }

    // Chromium reads its switches the Windows way: a quoted argument may hold spaces.
    static string Quote(string arg)
    {
        return "\"" + arg + "\"";
    }

    class Browser
    {
        public string Name, Exe;
    }

    /// <summary>The browser that already holds the learner's progress, else the first one installed.</summary>
    static Browser PickBrowser()
    {
        string[] roots = {
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),
            Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
        };
        string[][] known = {
            new[] { "Edge", "msedge.exe", @"Microsoft\Edge\Application\msedge.exe" },
            new[] { "Chrome", "chrome.exe", @"Google\Chrome\Application\chrome.exe" },
            new[] { "Brave", "brave.exe", @"BraveSoftware\Brave-Browser\Application\brave.exe" },
            new[] { "Vivaldi", "vivaldi.exe", @"Vivaldi\Application\vivaldi.exe" },
        };
        Browser found = null;
        foreach (string[] k in known)
        {
            string exe = FromAppPaths(k[1]);
            foreach (string root in roots)
                if (exe == null && root.Length > 0 && File.Exists(Path.Combine(root, k[2])))
                    exe = Path.Combine(root, k[2]);
            if (exe == null) continue;
            var browser = new Browser { Name = k[0], Exe = exe };
            if (Directory.Exists(Path.Combine(Home, browser.Name))) return browser;
            if (found == null) found = browser;
        }
        return found;
    }

    static string FromAppPaths(string exe)
    {
        foreach (RegistryKey hive in new[] { Registry.CurrentUser, Registry.LocalMachine })
            using (RegistryKey key = hive.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\" + exe))
            {
                string path = key == null ? null : key.GetValue(null) as string;
                if (path != null && File.Exists(path.Trim('"'))) return path.Trim('"');
            }
        return null;
    }

    static Form KeepAliveWindow(string url)
    {
        var form = new Form
        {
            Text = Title,
            Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath),
            Font = SystemFonts.MessageBoxFont,
            FormBorderStyle = FormBorderStyle.FixedDialog,
            MaximizeBox = false,
            StartPosition = FormStartPosition.CenterScreen,
            AutoSize = true,
            AutoSizeMode = AutoSizeMode.GrowAndShrink,
        };
        var layout = new FlowLayoutPanel { FlowDirection = FlowDirection.TopDown, AutoSize = true, Padding = new Padding(16) };
        layout.Controls.Add(new Label
        {
            AutoSize = true,
            Margin = new Padding(0, 0, 0, 12),
            Text = "Épreuves est ouvert dans votre navigateur.\nFermez cette fenêtre pour quitter l’app.",
        });
        var reopen = new Button { AutoSize = true, Text = "Rouvrir dans le navigateur" };
        reopen.Click += delegate { Process.Start(url); };
        layout.Controls.Add(reopen);
        form.Controls.Add(layout);
        return form;
    }

    static int ReadPort(string file)
    {
        // The first launch writes it once its server listens.
        for (int tries = 0; ; tries++)
        {
            try
            {
                return int.Parse(File.ReadAllText(file));
            }
            catch (Exception)
            {
                if (tries == 20) throw;
                Thread.Sleep(250);
            }
        }
    }

    static Dictionary<string, byte[]> LoadSite()
    {
        var files = new Dictionary<string, byte[]>(StringComparer.Ordinal);
        using (Stream zip = Assembly.GetExecutingAssembly().GetManifestResourceStream("site.zip"))
        using (var archive = new ZipArchive(zip, ZipArchiveMode.Read))
            foreach (ZipArchiveEntry entry in archive.Entries)
            {
                if (entry.Name.Length == 0) continue;
                using (Stream content = entry.Open())
                using (var bytes = new MemoryStream())
                {
                    content.CopyTo(bytes);
                    files[entry.FullName.Replace('\\', '/')] = bytes.ToArray();
                }
            }
        return files;
    }

    /// <summary>Listens on localhost only. If another program holds the port, the next one (with a fresh origin).</summary>
    static HttpListener Listen(out int port)
    {
        for (port = Port; port < Port + 10; port++)
        {
            var listener = new HttpListener();
            listener.Prefixes.Add(Url(port));
            try
            {
                listener.Start();
                return listener;
            }
            catch (HttpListenerException)
            {
            }
        }
        throw new Exception("Aucun port libre entre " + Port + " et " + (Port + 9) + ".");
    }

    static void Serve(HttpListener listener)
    {
        for (;;)
        {
            HttpListenerContext context = listener.GetContext();
            ThreadPool.QueueUserWorkItem(delegate { Respond(context); });
        }
    }

    static void Respond(HttpListenerContext context)
    {
        HttpListenerResponse response = context.Response;
        try
        {
            string path = Uri.UnescapeDataString(context.Request.Url.AbsolutePath).TrimStart('/');
            if (path.Length == 0) path = "index.html";
            byte[] body;
            if (site.TryGetValue(path, out body))
            {
                response.ContentType = Mime(path);
                // The names of the files under assets/ change with their content.
                response.AddHeader("Cache-Control",
                    path.StartsWith("assets/", StringComparison.Ordinal) ? "max-age=31536000, immutable" : "no-cache");
            }
            else
            {
                response.StatusCode = 404;
                response.ContentType = "text/plain; charset=utf-8";
                body = Encoding.UTF8.GetBytes("Introuvable : /" + path);
            }
            response.ContentLength64 = body.Length;
            if (context.Request.HttpMethod != "HEAD") response.OutputStream.Write(body, 0, body.Length);
            response.Close();
        }
        catch (Exception)
        {
            response.Abort();
        }
    }

    static string Mime(string path)
    {
        switch (Path.GetExtension(path).ToLowerInvariant())
        {
            case ".html": return "text/html; charset=utf-8";
            case ".js": return "text/javascript; charset=utf-8";
            case ".css": return "text/css; charset=utf-8";
            case ".json": case ".map": return "application/json";
            case ".webmanifest": return "application/manifest+json";
            case ".svg": return "image/svg+xml";
            case ".png": return "image/png";
            case ".ico": return "image/x-icon";
            case ".woff2": return "font/woff2";
            case ".woff": return "font/woff";
            default: return "application/octet-stream";
        }
    }
}
