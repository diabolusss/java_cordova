package com.custom;


import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.DroidGap;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;

public class KeyBoardPlugin extends CordovaPlugin {
	public static final String JS_CALL_KB = "showKeyBoard";
	
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		
		return false;		
	}
        private WebView mAppView;
        private DroidGap mGap;

        public KeyBoardPlugin(DroidGap gap, WebView view)
        {
            mAppView = view;
            mGap = gap;
        }


		public void showKeyBoard() {
            InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
            // only will trigger it if no physical keyboard is open
            mgr.showSoftInput(mAppView, InputMethodManager.SHOW_IMPLICIT);

            ((InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE)).showSoftInput(mAppView, 0);

        }

        public void hideKeyBoard() {
            InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
            mgr.hideSoftInputFromWindow(mAppView.getWindowToken(), 0);
        }



}