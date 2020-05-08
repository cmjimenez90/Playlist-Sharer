import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

import moment from 'moment';
import {config} from '../app-config';
import {AuthorizationContext,actionType} from '../authorization/AuthorizationContext';

const SpotifyAuthorization = () => {

    const navigation = useNavigation();
    let webView = null;
    const [state,action] = useContext(AuthorizationContext);

    const handleNavigationChange = (navigationState) => {
        const {url,loading} = navigationState;
        if(loading === false && url.includes('/authorize/spotify-music/callback')){
            const jsScript = `
                var response = document.body.innerText;
                if(response){
                    window.ReactNativeWebView.postMessage((document.body.innerText));
                }
                true;
            `;
            webView.injectJavaScript(jsScript);
        }
    }

    const handleAuthorizationResponse = async (event) => {
        const data = event.nativeEvent.data;
        try{
            const {hasError, authorizationToken } = await JSON.parse(data);
            if(hasError) {
                Alert.alert("SPOTIFY AUTH FAILURE - Please try again.");
                navigation.goBack();
            } else {
                const expDate = moment().add(authorizationToken.expires_in,'seconds');
                action({type: actionType.authorizeSpotify, payload: {expDate,...authorizationToken}});
                navigation.navigate("Converter");
            }
        } catch(error){
            console.error(error);
            console.error("SPOTIFY AUTHORIZATION ERROR - JSON PARSE");
        }
    };

    return (
        <>
            <WebView 
                ref={ref => (webView = ref)} 
                source={{ uri:  new URL(config.SPOTIFY_AUTH_ENDPOINT,config.API_HOST).toString()}} 
                onNavigationStateChange={handleNavigationChange} 
                onMessage={handleAuthorizationResponse}
                startInLoadingState={true}
            />
        </>
    )
}

export default SpotifyAuthorization
