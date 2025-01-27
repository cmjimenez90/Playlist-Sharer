import React, {useState,useContext} from 'react'
import {View, Text, TextInput, Linking, Alert} from 'react-native';
import {AuthorizationContext} from '../authorization/AuthorizationContext';
import {styles} from '../style/main.style';
import axios from 'axios';
import URLConversionResult from './URLConversionResult';
import useConfig from './useConfig';

const  URLConversionForm = () => {

    const {API_HOST} = useConfig();
    const [state,action] = useContext(AuthorizationContext);
    const [sourceURL, setSourceURL] = useState('Enter URL Here');
    const [convertedURL, setConvertedURL] = useState('');
    const [showConversionResult,setShowConversionResult] = useState(false);
   
  
    const openURL = () => {
        console.log("called");
        if(Linking.canOpenURL(`${convertedURL}`)){
            Linking.openURL(`${convertedURL}`)
        }
        setShowConversionResult(!showConversionResult);
        setConvertedURL('');
        setSourceURL('');
    };

    const convertToAppleURL = () => {
        setShowConversionResult(true); 
        const authorizationHeader = `Bearer ${state.appleToken}`;
        axios.post(`${API_HOST}/api/v1/apple-music`,
        {
            itemURL: sourceURL,
        },
        {
            headers:{
                authorization: authorizationHeader,
            }
        }
        ).then((response) => {
            const data = response.data;
            if(data.convertedURL){
                setConvertedURL(data.convertedURL);
            }
            else{
                handleConversionError(response);
                setShowConversionResult(false); 
            }  
        })
        .catch((error) => {
            console.log(error);
            setShowConversionResult(false);
            Alert.alert("ERROR",error);
        });  
    }

    const convertToSpotifyURL = () => {
        setShowConversionResult(true);  
        const authorizationHeader = `Bearer ${state.spotifyToken}`;
        axios.post(`${API_HOST}/api/v1/spotify-music`,
        {
            itemURL: sourceURL,
        },
        {
            headers:{
                authorization: authorizationHeader,
            }
        }
        ).then((response) => {
            const data = response.data;
            if(data.convertedURL){
                setConvertedURL(data.convertedURL);
            }
            else{
                handleConversionError(response);
                setShowConversionResult(false); 
            }  
        })
        .catch((error) => {
            console.log(error);
            setShowConversionResult(false); 
            Alert.alert("ERROR",error);
        });
    };

    const handleConversionError = (response) => {
        console.log(response.error);
        console.log(response.message);
        if(response.error = 'AUTHORIZATION'){
            Alert.alert("Please reauthorize the application in the settings menu");
        }
        else {
            Alert.alert(response.error);
        }
    }

    return (
        <>
        <View style={styles.urlEntryFrom}>
            <Text style={styles.urlTextHeader}>Enter a URL to Convert</Text>
            <TextInput selectTextOnFocus={true} style={styles.urlTextEntry} value={sourceURL} onChangeText={(text) => setSourceURL(text)} />
        </View>
       <View style={styles.buttonContainer}>
           {
               (!state.isAppleAuthorized)? <></> :  <ApplePlatformButton onPress={convertToAppleURL}></ApplePlatformButton>
           }
           {
               (!state.isSpotifyAuthorized)? <></> :  <SpotifyPlatfromButton onPress={convertToSpotifyURL}></SpotifyPlatfromButton>
           }
        </View>
        {showConversionResult ? <URLConversionResult url={convertedURL} onPress={openURL}></URLConversionResult> : <></>}
        </>
    )
}

export default URLConversionForm;