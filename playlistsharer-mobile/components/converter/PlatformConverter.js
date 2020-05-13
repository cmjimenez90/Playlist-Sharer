import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { color, styles } from '../../style/playlistsharer.style'
import axios from 'axios'

import { constants, config } from '../../app-config'
import BaseTitle from '../base/BaseTitle'
import BaseText from '../base/BaseText'
import ImageButton from '../base/ImageButton'
import BaseModal from '../base/BaseModal'
import ConversionResult from './ConversionResult'
import {useAuthorizationState} from '../authorization/AuthorizationContext'


const PlatformConverter = ({platform}) => {

    const [showModal,setShowModal] = useState(false);
    const [inputURL, setInputURL] = useState("URL");
    const [convertedURL, setConvertedURL] = useState(''); 
    const [conversionError, setConversionError] = useState('');
    const [conversionState, setConversionState] = useState('COMPLETED')
    const {SpotifyAuth, AppleAuth} = useAuthorizationState();

    const openURL = () => {
        if(Linking.canOpenURL(`${convertedURL}`)){
            Linking.openURL(`${convertedURL}`)
        }
        setShowModal(!showModal);
        setConvertedURL('');
        setInputURL('');
    };

    const convertToAppleURL = () => {
        setConversionState("CONVERTING");
        setShowModal(true);
        const requestURL = new URL(config.APPLE_CONVERSION_ENDPOINT,config.API_HOST);
        const authorizationHeader = `Bearer ${AppleAuth.access_token}`;
        axios.post(requestURL.toString(),
        {
            itemURL: inputURL,
        },
        {
            headers:{
                authorization: authorizationHeader,
            }
        }
        ).then((response) => {
            const data = response.data;
            if(data.hasError){
                setConversionError(data.message);
            }else {
                setConvertedURL(data.convertedURL);
            }
            setConversionState("COMPLETE");
        })
        .catch((error) => {
            handleConversionError(error);
            setConversionState("COMPLETE");
        });  
    }

    const convertToSpotifyURL = () => {
        setConversionState("CONVERTING");
        setShowModal(true);
        const requestURL = new URL(config.SPOTIFY_CONVERSION_ENDPOINT,config.API_HOST);
        const authorizationHeader = `Bearer ${SpotifyAuth.access_token}`;
        axios.post(requestURL.toString(),
        {
            itemURL: inputURL,
        },
        {
            headers:{
                authorization: authorizationHeader,
            }
        }
        ).then((response) => {
            const data = response.data;
            if(data.hasError){
                setConversionError(data.message);
            }else {
                setConvertedURL(data.convertedURL);
            }
            setConversionState("COMPLETE");
        })
        .catch((error) => {
            handleConversionError(error);
            setConversionState("COMPLETE");
        });  
    }

    const handleConversionError = (response) => {
        console.log(response);
        setConversionError(response.message);
    }

    const reset = () => {
        setShowModal(false);
        setInputURL("URL");
        setConversionError(null);
        setConvertedURL(null);
    }

    return (
        <View style={[styles.container,component.container]}>
           <View style={component.header}>
            <BaseTitle>
                Playlist Sharer
            </BaseTitle>
            <BaseText>
                    Enter a URL to convert.
            </BaseText>
           </View>
            <View style={styles.container}>
                <TextInput
                    style={[component.urlInput]} 
                    value={inputURL} 
                    onChangeText={(text) => setInputURL(text)}
                />
                {(() => {
                switch(platform){
                    case constants.PLATFORM.APPLE:
                        return <ImageButton source={require('../../assets/apple-listen-logo.png')} onPress={convertToAppleURL}/>
                    case constants.PLATFORM.SPOTIFY:
                        return <ImageButton source={require('../../assets/spotify-logox150.png')} onPress={convertToSpotifyURL}/>
                    default: 
                        return <ImageButton />
                }
                })()}
            </View>
            <BaseModal isVisible={showModal}>
                {(() => {
                    switch(conversionState){
                    case "COMPLETE":
                        return (conversionError) ? <BaseText>{conversionError}</BaseText> : <ConversionResult>{convertedURL}</ConversionResult>
                    case "CONVERTING":
                    default: 
                        return <ActivityIndicator size={"large"} color={color.secondary}/>
                }
                })()}
                <TouchableOpacity onPress={reset} style={component.modalCloseButton}>
                    <Ionicons name="md-close-circle-outline" color={color.secondary} size={38} />
                </TouchableOpacity>
           </BaseModal>
        </View>
    )
}

export default PlatformConverter

const component = StyleSheet.create({
    container: {
        paddingTop: 80
    },
    header: {
        padding: 20,
        alignItems: "center",
    },
    urlInput: {
        marginTop: 10,
        marginBottom: 20,
        color: color.secondary,
        width: "80%",
        backgroundColor: color.accent,
        borderWidth: 1,
        borderColor: color.secondary
    },
    modalCloseButton: {
        marginTop: 15
    }
})
