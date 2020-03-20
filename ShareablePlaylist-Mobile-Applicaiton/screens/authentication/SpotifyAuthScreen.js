import React, {useContext} from 'react'
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
import {AsyncStorage} from 'react-native';

import {ShareablePlaylistURL} from 'react-native-dotenv';
import {AuthenticationContext} from '../../authentication/AuthenticationContext';

const SpotifyAuthScreen = ({ navigation }) => {

   
   const [state,action] = useContext(AuthenticationContext);
   let webView = null;
   const authroizationURL = `${ShareablePlaylistURL}/authorize/spotify`;
   
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
                navigation.goBack();
            }
            else {
                const authorizationToken = response.authorizationToken;
                action({type: 'AuthorizeSpotify',payload: authorizationToken});
                
            }
        } catch(error){
            console.log(error);
            Alert.alert('Error Parsing the response');
            navigation.goBack();
        }
    };
    return (
        <WebView ref={ref => (webView = ref)} source={{uri: authroizationURL}} onNavigationStateChange={handleAuthorizationNavigation} onMessage={handleAuthorizationResponse} />
    )
}

export default SpotifyAuthScreen;
