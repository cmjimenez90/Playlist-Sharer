import React from 'react'
import { View, Text, NativeModules, Alert } from 'react-native'

import {styles} from '../../style/main.style';
import ApplePlatformButton from '../../components/ApplePlatformButton';
import SpotifyPlatfromButton from '../../components/SpotifyPlatfromButton';
import axios from 'axios'
const SignInScreen = ({navigation}) => {

    const handleSpotifyAuthorization = () => {
        navigation.navigate('SpotifyAuthScreen')
    };

    const handleAppleAuthorization = () => {
        const AppleMusicUserAuthorization = NativeModules.AppleMusicUserAuthorization;
        axios.get('http://localhost:3000/authorize/apple')
        .then((response)=>{
            const devToken = response.data;
            AppleMusicUserAuthorization.getUserToken(devToken,(error, result) => {
                if(error){
                    Alert.alert(error);
                } 
                else{
                    Alert.alert("SUCCESS");
                }
                
            })
        })
        .catch((error)=>{
            Alert.alert(error.message);
        })
    };

    return (
        <View style={styles.container}>
           <View style={styles.signInScreen}>
            <View style={styles.textContainer}>
                <Text style={styles.textContainerHeader}>Welcome to Playlist Share</Text>
                <Text>Please sign in to your music stream platform of choice:</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ApplePlatformButton onPress={handleAppleAuthorization}></ApplePlatformButton>
                <SpotifyPlatfromButton onPress={handleSpotifyAuthorization}></SpotifyPlatfromButton>
            </View>
        </View>
        </View>
    )
}

export default SignInScreen
