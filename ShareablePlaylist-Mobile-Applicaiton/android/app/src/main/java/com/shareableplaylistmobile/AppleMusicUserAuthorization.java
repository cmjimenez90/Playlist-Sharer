package com.shareableplaylistmobile;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.apple.android.sdk.authentication.*;
public class AppleMusicUserAuthorization extends ReactContextBaseJavaModule  {


    private AuthenticationManager authenticationManager;

    private String TAG = "PLAYLIST SHARER_AUTH";
    private static final int ACTIVITYCODE = 12345;
    private ReactContext context;
    private Callback callbackFn;


    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == ACTIVITYCODE){
                if (callbackFn != null) {
                    TokenResult tokenResult = authenticationManager.handleTokenResult(intent);
                    if(tokenResult.isError()){
                        Log.d(TAG, "onActivityResult: ERROR " + tokenResult.getError().name());
                        callbackFn.invoke(tokenResult.getError().name(), null);
                    }else{
                        Log.d(TAG, "onActivityResult: SUCCESS "+ tokenResult.getMusicUserToken());
                        callbackFn.invoke(null, tokenResult.getMusicUserToken());
                    }
                }
                callbackFn = null;
            }
        }
    };

    public AppleMusicUserAuthorization(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.authenticationManager = AuthenticationFactory.createAuthenticationManager(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
        this.context = reactContext;

    }

    @NonNull
    @Override
    public String getName() {
        return "AppleMusicUserAuthorization";
    }

    @ReactMethod
    public void getUserToken(String developerToken, Callback callbackFn){
        this.callbackFn = callbackFn;
        try{
            AuthIntentBuilder intentBuilder = authenticationManager.createIntentBuilder(developerToken);
            Intent authorizationIntent = intentBuilder.setStartScreenMessage("Sign in to allow Playlist Sharer to access your library").setHideStartScreen(true).build();
            Log.d(TAG, "getUserToken: Starting Activity");
            this.context.startActivityForResult(authorizationIntent, ACTIVITYCODE, null);
        }
        catch(Exception exception){
            this.callbackFn.invoke(exception.getMessage(), null);
            this.callbackFn = null;
        }

    }

}
