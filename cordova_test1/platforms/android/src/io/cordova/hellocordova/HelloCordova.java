package io.cordova.hellocordova;
import org.apache.cordova.DroidGap;

import android.os.Bundle;

import com.strumsoft.websocket.phonegap.WebSocketFactory;

public class HelloCordova extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        super.init();  
       
     // Bind websocket support
        appView.addJavascriptInterface(new WebSocketFactory(appView.getHandler(), appView), "WebSocketFactory");
        
        super.loadUrl("file:///android_asset/www/index.html");
        
        

    }
    
    protected void onResume(){
    	super.onResume();
    	super.loadUrl("file:///android_asset/www/index.html");
    }
    
    protected void onPause(){
    	super.onPause();
    	
    }

}