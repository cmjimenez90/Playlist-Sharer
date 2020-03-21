import React, {useState,useContext} from 'react'
import {View, Text, TextInput, Modal, Button, TouchableOpacity, Linking} from 'react-native';
import {AuthenticationContext} from '../authentication/AuthenticationContext';
import {styles} from '../style/main.style';
import axios from 'axios';

const  URLConversionForm = () => {

    const [state,action] = useContext(AuthenticationContext);
    const [sourceURL, setSourceURL] = useState('Enter URL Here');
    const [convertedURL, setConvertedURL] = useState('');
    const [showConvertedURL, setShowConvertedURL] = useState(false);
    
    const openURL = () => {
        if(Linking.canOpenURL(`${convertedURL}`)){
            setSourceURL('');
            setShowConvertedURL(false);
            Linking.openURL(`${convertedURL}`)
        }
    };
    const convertToSpotifyURL = () => {  
        const authorizationHeader = `Bearer ${state.spotifyToken}`;
        axios.post('http://10.0.0.45/api/v1/spotify-music',
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
            console.log(data);
            setConvertedURL(data.convertedURL);
            setShowConvertedURL(true);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            console.log(error.response.data.error);
            console.log(error.response.data.message);
        });    
    };

    return (
       <>
        <View style={styles.urlEntryFrom}>
            <Text style={styles.urlTextHeader}>Enter a URL to Convert</Text>
            <TextInput selectTextOnFocus={true} style={styles.urlTextEntry} value={sourceURL} onChangeText={(text) => setSourceURL(text)} />
        </View>
       <View style={styles.buttonContainer}>
           {
               (!state.isAppleAuthorized)? <></> :  <ApplePlatformButton ></ApplePlatformButton>
           }
           {
               (!state.isSpotifyAuthorized)? <></> :  <SpotifyPlatfromButton onPress={convertToSpotifyURL}></SpotifyPlatfromButton>
           }
        </View>
        <Modal 
            visible={showConvertedURL}
            animationType="slide"
            presentationStyle='formSheet'
        >
            <View style={styles.URLModalContainer}>
                <TouchableOpacity onPress={openURL}>
                    <Text style={styles.URLModalText}> {convertedURL} </Text>
                </TouchableOpacity>
                <Button
                style={styles.URLModalButton}
                title="Close"
                onPress={() => {
                  setShowConvertedURL(false);
                }}>
              </Button>
            </View>
        </Modal>
       </>
    )
}

export default URLConversionForm;