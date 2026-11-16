package com.sevascan.wallet;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
public class MainActivity extends Activity {
  private MinerEngine miner;
  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    miner = new MinerEngine();
    WebView wv = new WebView(this);
    WebSettings ws = wv.getSettings();
    ws.setJavaScriptEnabled(true);
    ws.setDomStorageEnabled(true);
    wv.setWebViewClient(new WebViewClient());
    wv.addJavascriptInterface(new Bridge(), "AndroidSevascan");
    wv.loadUrl("file:///android_asset/index.html");
    setContentView(wv);
  }
  public class Bridge {
    @JavascriptInterface public void startMine(String addr) { miner.start(addr); }
    @JavascriptInterface public void stopMine() { miner.stop(); }
    @JavascriptInterface public String getStats() {
      return "{\"running\":" + miner.isRunning() + ",\"hashes\":" + miner.getHashes() + ",\"blocks\":" + miner.getBlocksFound() + "}";
    }
    @JavascriptInterface public void shareWallet(String text) {
      Intent i = new Intent(Intent.ACTION_SEND);
      i.setType("text/plain");
      i.putExtra(Intent.EXTRA_SUBJECT, "SEVASCAN_MASTER_SEED_USB.txt");
      i.putExtra(Intent.EXTRA_TEXT, text);
      startActivity(Intent.createChooser(i, "Save / Export Cold Wallet Seed"));
    }
  }
}