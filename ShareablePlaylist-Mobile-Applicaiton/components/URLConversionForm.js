import React, {useState,useContext} from 'react'
import {View, Text, TextInput, Alert} from 'react-native';
import {AuthenticationContext} from '../authentication/AuthenticationContext';
import {styles} from '../style/main.style';
import axios from 'axios';

const  URLConversionForm = () => {

    const [state,action] = useContext(AuthenticationContext);
    const [conversionURL, setConversionURL] = useState('Spotify or Apple URL')

    const convertToSpotifyURL = () => {
        
        const authorizationHeader = `Bearer ${state.spotifyToken}`;
        console.log(authorizationHeader);
        axios.post('http://10.0.0.45/api/v1/spotify-music',
        {
            itemURL: conversionURL,
        },
        {
            headers:{
                authorization: authorizationHeader,
            }
        }
        ).then((response) => {
            const data = response.data;
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.headers);
            console.log(error.response.data.error);
            console.log(error.response.data.message);
        });
        
    };

    return (
       <>
        <View style={styles.urlEntryFrom}>
            <Text style={styles.urlTextHeader}>Enter a URL to Convert</Text>
            <TextInput style={styles.urlTextEntry} value={conversionURL} onChangeText={(text) => setConversionURL(text)} />
        </View>
       <View style={styles.buttonContainer}>
           {
               (!state.isAppleAuthorized)? <></> :  <ApplePlatformButton ></ApplePlatformButton>
           }
           {
               (!state.isSpotifyAuthorized)? <></> :  <SpotifyPlatfromButton onPress={convertToSpotifyURL}></SpotifyPlatfromButton>
           }
            </View>
       </>
    )
}

export default URLConversionForm;