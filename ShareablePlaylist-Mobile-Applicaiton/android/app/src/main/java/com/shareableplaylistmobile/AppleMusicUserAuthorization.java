package com.shareableplaylistmobile;

import android.app.Activity;
import android.content.Intent;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.apple.android.sdk.authentication.*;

public class AppleMusicUserAuthorization extends ReactContextBaseJavaModule  {


    private AuthenticationManager authenticationManager;

    private String TAG = "APPLE_AUTHORIZATION";
    private static final int ACTIVITYCODE_APPLEAUTH = 2006;
    private Callback callbackFn;


    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == ACTIVITYCODE_APPLEAUTH) {
                if (callbackFn != null) {
                    TokenResult tokenResult = authenticationManager.handleTokenResult(intent);
                    if(tokenResult.isError()){
                        callbackFn.invoke(tokenResult.getError().name(), null);
                    }else{
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
    }

    @NonNull
    @Override
    public String getName() {
        return "AppleMusicUserAuthorization";
    }

    @ReactMethod
    public void getUserToken(String developerToken, Callback callbackFn){

        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callbackFn.invoke("ACTIVITY_ERROR", null);
            return;
        }

        this.callbackFn = callbackFn;
        try{
            AuthIntentBuilder intentBuilder = authenticationManager.createIntentBuilder(developerToken);
            Intent authorizationIntent = intentBuilder.setStartScreenMessage("Connect Playlist Sharer to allow Playlist Imports").build();

            currentActivity.startActivityForResult(authorizationIntent, ACTIVITYCODE_APPLEAUTH, null);
        }
        catch(Exception exception){
            this.callbackFn.invoke(exception.getMessage(), null);
            this.callbackFn = null;
        }

    }

}
