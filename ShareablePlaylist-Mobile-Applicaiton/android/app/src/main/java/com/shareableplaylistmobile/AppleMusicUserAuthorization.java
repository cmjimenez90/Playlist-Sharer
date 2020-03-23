package com.shareableplaylistmobile;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.apple.android.sdk.authentication.*;

public class AppleMusicUserAuthorization extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;
    public AppleMusicUserAuthorization(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "AppleMusicUserAuthorization";
    }

    @ReactMethod
    public void getUserToken(String developerToken, Callback callbackFn){
        

        callbackFn.invoke(null,developerToken);
    }
}
