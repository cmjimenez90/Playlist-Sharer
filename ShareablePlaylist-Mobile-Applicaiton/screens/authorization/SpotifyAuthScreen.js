import React, {useContext} from 'react'
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

import {AuthorizationContext} from '../../authorization/AuthorizationContext';
import AuthorizationStorage from '../../authorization/AuthorizationStorage';
import useConfig from '../../components/useConfig';

const SpotifyAuthScreen = () => {

   const {API_HOST} = useConfig();
   const [state,action] = useContext(AuthorizationContext);
   const authorizationStorage = new AuthorizationStorage();

   let webView = null;
   const authroizationURL = `${API_HOST}/authorize/spotify`;
   
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
                await authorizationStorage.asyncSaveItemToStore(authorizationStorage.SPOTIFY_TOKEN,authorizationToken.access_token);
                await authorizationStorage.asyncSaveItemToStore(authorizationStorage.SPOTIFY_REFRESH,authorizationToken.refresh_token);
                await authorizationStorage.asyncSaveItemToStore(authorizationStorage.SPOTIFY_EXPIRATION,authorizationToken.expires_in.toString());
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
