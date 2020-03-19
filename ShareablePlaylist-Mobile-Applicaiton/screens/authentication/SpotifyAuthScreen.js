import React, {useContext} from 'react'
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

import {AuthenticationContext} from '../../authentication/AuthenticationContext';

const SpotifyAuthScreen = ({navigation}) => {

   const [state,action] = useContext(AuthenticationContext);
   let webView = null;

   const handleAuthorizationNavigation = (newNav) => {
        const {url,loading} = newNav;
        if(url.includes('/authorize/spotify/callback?') && loading === false){
            webView.injectJavaScript("window.ReactNativeWebView.postMessage((document.body.innerText))");
        };
    };

    const handleAuthorizationResponse = (event) => {
        const data = event.nativeEvent.data;
        const response = JSON.parse(data);
        if(response.hasError){
            Alert.alert('Authorization was not granted successfully, please try again..');
            navigation.navigate('SignInScreen');
        }
        else {
            action({type: 'AuthorizeSpotify',payload: response.authorizationToken});
            navigation.navigate('MainScreen')
        }

    };

    return (
        <WebView ref={ref => (webView = ref)} source={{uri: 'http://localhost:3000/authorize/spotify'}} onNavigationStateChange={handleAuthorizationNavigation} onMessage={handleAuthorizationResponse} />
    )
}

export default SpotifyAuthScreen;
