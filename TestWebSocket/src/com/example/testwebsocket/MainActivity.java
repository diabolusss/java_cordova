package com.example.testwebsocket;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Menu;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.rusak.pincardgenerator.R;

public class MainActivity extends Activity {

	public static WebView webView = null;
	
	@SuppressLint({ "JavascriptInterface", "SetJavaScriptEnabled" })
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		 // If the Android version is lower than Jellybean, use this call to hide
        // the status bar.
        if (Build.VERSION.SDK_INT < 16) {
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
		//super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		//super.onCreate(savedInstanceState);
		//setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		//setContentView(R.layout.activity_main);
		
		/**
		 * The CookieSyncManager is used to synchronize the browser cookie store between 
		 * RAM and permanent storage. To get the best performance, browser cookies are 
		 * saved in RAM. A separate thread saves the cookies between, driven by a timer.
		 */
		CookieSyncManager.createInstance(this);
		CookieSyncManager.getInstance().startSync();
		
		webView = (WebView) findViewById(R.id.custom_webview);
		//webView.getSettings().setJavaScriptEnabled(true);
		//webView.loadUrl("file:///android_asset/www/chat.html ");
		//webView.loadUrl("http://v-kurse.com ");

		// attach websocket factory
		//webView.addJavascriptInterface(new WebSocketFactory(null, webView), "WebSocketFactory");
		
		super.onCreate(savedInstanceState);
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

		//webView  = new WebView(this);
		webView.getSettings().setJavaScriptEnabled(true); // enable javascript
        final Activity activity = this;

        /*webView.setWebViewClient(new WebViewClient() {
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(activity, description, Toast.LENGTH_SHORT).show();
            }
        });*/
        
        webView.setWebChromeClient(new WebChromeClient(){
        	public void onProgressChanged(WebView view, int progress)   
            {
             //Make the bar disappear after URL is loaded, and changes string to Loading...
        		activity.setTitle("Loading...");
        		activity.setProgress(progress * 100); //Make the bar disappear after URL is loaded

             // Return the app name after finish loading
                if(progress == 100)
                	activity.setTitle(R.string.app_name);
              }
        });
        
        /**
         * I figured out what's going on. When I load a page through a server side action (a url visit),
         *  and view the html returned from that action inside a Webview, that first action/page runs 
         *  inside that Webview. However, when you click on any link that are action commands in your web app,
         *   these actions start a new browser. That is why cookie info gets lost because the first cookie
         *    information you set for Webview is gone, we have a seperate program here. 
         *    You have to intercept clicks on Webview so that browsing never leaves the app,
         *    everything stays inside the same Webview.
         */
        webView.setWebViewClient(new WebViewClient(){  
            @Override  
            public boolean shouldOverrideUrlLoading(WebView view, String url)            {  
              //view.loadUrl(url);  
              //return true;  
            	return false;
            }  
          });                 
        webView.getSettings().setJavaScriptEnabled(true);      
        
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        /*try {  
            File filesDir = this.getExternalFilesDir(null);   
            File file = new File(filesDir, "SomeFolder"); 
            if (!file.exists()) {
                file.mkdirs();  
            }
            webView.getSettings().setDatabasePath(file.getAbsolutePath());
        } catch (Exception e) {
             throw new RuntimeException("Failed to mkdir dirs, " + e.getMessage(), e);                                    
        }*/
        
        //webView.addJavascriptInterface(new WebSocketFactory(webView.getHandler(), webView), "WebSocketFactory");
        
        //webView.loadUrl("file:///android_asset/www/wsocket.html ");
        //webView.loadUrl("file:///android_asset/LayoutChanger/translate.html ");
        //webView.loadUrl("file:///android_asset/MPW/index.html");
        webView.loadUrl("file:///android_asset/PasswordPinCardGenerator/passwordcard.html ");
        
        //webView.loadUrl("http://demo.v-kurse.com");
        //setContentView(webView );
        
        CookieManager.getInstance().setAcceptCookie(true);
        //CookieManager.setAcceptFileSchemeCookies(true);

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	
	class CustomHandler extends Handler {
	    @Override
	    public void handleMessage(Message msg) {
	    	System.out.println("Handler MSG");
	    }
	}

}
ge(Message msg) {
	    	System.out.println("Handler MSG");
	    }
	}

}
