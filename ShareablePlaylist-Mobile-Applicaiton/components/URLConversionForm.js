import React, {useState,useContext} from 'react'
import {View, Text, TextInput, Alert} from 'react-native';
import {AuthenticationContext} from '../authentication/AuthenticationContext';
import {styles} from '../style/main.style';

const  URLConversionForm = () => {

    const [state,action] = useContext(AuthenticationContext);
    const [conversionURL, setConversionURL] = useState('Spotify or Apple URL')

    const convertToSpotifyURL = () => {
        Alert.alert(`${state.isSpotifyAuthorized}|${state.spotifyToken}|${state.spotifyExpiration}|${state.spotifyRefreshToken}`);
    };

    return (
       <>
        <View style={styles.urlEntryFrom}>
            <Text style={styles.urlTextHeader}>Enter a URL to Convert</Text>
            <TextInput style={styles.urlTextEntry} value={conversionURL} onChangeText={(text) => setConversionURL(text)} />
        </View>
       <View style={styles.buttonContainer}>
            <ApplePlatformButton ></ApplePlatformButton>
            <SpotifyPlatfromButton onPress={convertToSpotifyURL}></SpotifyPlatfromButton>
       </View>
       </>
    )
}

export default URLConversionForm;