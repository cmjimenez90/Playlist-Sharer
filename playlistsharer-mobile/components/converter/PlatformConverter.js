/* eslint-disable no-undef */
import React, { useState } from 'react'
import { StyleSheet, View, TextInput, ActivityIndicator, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { color, styles } from '../../style/playlistsharer.style'

import { constants } from '../../app-config'
import BaseTitle from '../base/BaseTitle'
import BaseText from '../base/BaseText'
import ImageButton from '../base/ImageButton'
import BaseModal from '../base/BaseModal'
import ConversionResult from './ConversionResult'
import {useAuthorizationState} from '../authorization/AuthorizationContext'
import PlaylistSharerClient from '../../service/PlaylistSharerClient'

const PlatformConverter = ({platform}) => {

    const [showModal,setShowModal] = useState(false);
    const [inputURL, setInputURL] = useState("");
    const [hasInputError,setInputError] = useState(false);
    const [convertedURL, setConvertedURL] = useState(''); 
    const [conversionError, setConversionError] = useState('');
    const [conversionState, setConversionState] = useState('CONVERTING')
    const {SpotifyAuth, AppleAuth} = useAuthorizationState();
    const client = new PlaylistSharerClient();

    const openURL = () => {
        if(Linking.canOpenURL(`${convertedURL}`)){
            Linking.openURL(`${convertedURL}`)
        }
        setShowModal(!showModal);
        setConvertedURL('');
        setInputURL('');
    };

    const validateInput = () => {
        if(inputURL == '' || inputURL == null) {
            setInputError(true);
            return false;
        }

        if(!inputURL.match(/^https:\/\//)) {
            setInputError(true);
            return false;
        }

        return true;
    }

    const convertToAppleURL = async () => {
        if(!validateInput()){
            return;
        }

        setConversionState("CONVERTING");
        setShowModal(true);
        try{
            const conversionResult = await client.convertItemToSpotify(AppleAuth.access_token,inputURL)
            if(conversionResult.hasError){
                if(conversionResult.error == 'AUTHORIZATION'){
                    setConversionError(conversionResult.error);
                } else {
                    setConversionError(conversionResult.error);
                }
            } else if (!conversionResult.convertedURL){
                setConversionError("Sorry, Failed to convert item");  
            } else {
                setConvertedURL(conversionResult.convertedURL);
            }
        
        }catch(error) {
            setConversionError(error.message);
        }
       setConversionState("COMPLETE");
    }

    const convertToSpotifyURL = async () => {
        if(!validateInput()){
            return;
        }
        setConversionState("CONVERTING");
        setShowModal(true);
        try{
            const conversionResult = await client.convertItemToSpotify(SpotifyAuth.access_token,inputURL)
            if(conversionResult.hasError){
                if(conversionResult.error == 'AUTHORIZATION'){
                    setConversionError(conversionResult.error);
                } else {
                    setConversionError(conversionResult.error);
                }
            } else if (!conversionResult.convertedURL){
                setConversionError("Sorry, Failed to convert item");  
            } else {
                setConvertedURL(conversionResult.convertedURL);
            }
        
        }catch(error) {
            setConversionError(error.message);
        }
       setConversionState("COMPLETE");
    }

    const reset = () => {
        setShowModal(false);
        setInputURL("");
        setConversionError(null);
        setConvertedURL(null);
        setInputError(false);
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
                    style={[component.urlInput,(hasInputError ? component.urlInputError : {})]} 
                    value={inputURL} 
                    onChangeText={(text) => {
                        if(hasInputError){
                            setInputError(false);
                        }
                        setInputURL(text)
                    }}
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
                        return (conversionError) ? <BaseText>{conversionError}</BaseText> : <ConversionResult onPress={openURL}>{convertedURL}</ConversionResult>
                    case "CONVERTING":
                    default: 
                        return <ActivityIndicator size={"large"} color={color.secondary}/>
                }
                })()}
                <TouchableOpacity onPress={reset} style={component.modalCloseButton}>
                    <Ionicons name="md-close-circle-outline" color={color.secondary} size={50} />
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
    urlInputError: {
        borderColor: 'red'
    },
    modalCloseButton: {
        marginTop: 15
    }
})
