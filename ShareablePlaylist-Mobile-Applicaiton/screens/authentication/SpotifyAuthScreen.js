import React from 'react'
import { WebView } from 'react-native-webview';

const SpotifyAuthScreen = () => {

    let webView = null;

   const handleAuthorizationNavigation = (newNav) => {
        const {url,loading} = newNav;
        if(url.includes('/authorize/spotify/callback?') && loading === false){
            webView.injectJavaScript("window.ReactNativeWebView.postMessage((document.body.innerText))");
        };
    };

    const handlerAuthorizationResponse = (event) => {
        const data = event.nativeEvent.data;
        const response = JSON.parse(data);
        console.log(response);
    };
    
    return (
        <WebView ref={ref => (webView = ref)} source={{uri: 'http://localhost:3000/authorize/spotify'}} onNavigationStateChange={handleAuthorizationNavigation} onMessage={handlerAuthorizationResponse} />
    )
}

export default SpotifyAuthScreen;
