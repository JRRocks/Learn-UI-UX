package io.github.jrrocks.epreuves;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // The app's own plugin, which installs the updates published on GitHub (src/lib/appUpdate.ts).
        registerPlugin(AppUpdatePlugin.class);
        super.onCreate(savedInstanceState);
        WebView webView = getBridge().getWebView();
        // The web view is white until the page paints: the paper of the app instead, light or dark,
        // so a phone in dark mode does not flash white at each launch.
        webView.setBackgroundColor(ContextCompat.getColor(this, R.color.paper));
        // The font size of the phone (Settings > Display > Font size) becomes the default font size of
        // the page, as a reader sets it in a browser: the layouts of the app follow it (their em-based
        // breakpoints, checked at 20, 24 and 32 px). The web view's own text zoom enlarged the text
        // alone, behind their back: at 130 %, the labels of the tab bar ran into each other.
        WebSettings settings = webView.getSettings();
        settings.setTextZoom(100);
        settings.setDefaultFontSize(Math.round(16 * getResources().getConfiguration().fontScale));
    }
}
