import React, {useContext} from 'react'
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

import {ShareablePlaylistURL} from 'react-native-dotenv';
import {AuthenticationContext} from '../../authentication/AuthenticationContext';
import AuthenticationStorage from '../../authentication/AuthenticationStorage';

const SpotifyAuthScreen = ({ navigation }) => {

   
   const [state,action] = useContext(AuthenticationContext);
   const authenticationStorage = new AuthenticationStorage();

   let webView = null;
   const authroizationURL = `http://10.0.0.45/authorize/spotify`;
   
   const handleAuthorizationNavigation = (newNav) => {
        const {url,loading} = newNav;
        if(url.includes('/authorize/spotify/callback?') && loading === false){
            const jsScript = `
                window.ReactNativeWebView.postMessage((document.body.innerText));
                true;
            `;
            webView.injectJavaScript(jsScript);
        };
    };

    const handleAuthorizationResponse = async (event) => {
        const data = event.nativeEvent.data;
        try{
            const response = await JSON.parse(data);
            if(response.hasError){
                Alert.alert('Authorization was not granted successfully, please try again..');
            }
            else {
                const authorizationToken = response.authorizationToken;
                await authenticationStorage.asyncSaveItemToStore(authenticationStorage.SPOTIFY_TOKEN,authorizationToken.access_token);
                await authenticationStorage.asyncSaveItemToStore(authenticationStorage.SPOTIFY_REFRESH,authorizationToken.refresh_token);
                await authenticationStorage.asyncSaveItemToStore(authenticationStorage.SPOTIFY_EXPIRATION,authorizationToken.expires_in.toString());
                action({type: 'AuthorizeSpotify',payload: authorizationToken});
            }
        } catch(error){
            console.log(error.message);
        }
    };

    return (
        <WebView ref={ref => (webView = ref)} source={{uri: authroizationURL}} onNavigationStateChange={handleAuthorizationNavigation} onMessage={handleAuthorizationResponse} />
    )
}

export default SpotifyAuthScreen;
