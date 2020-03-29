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
        axios.get('http://10.0.0.45/authorize/apple')
        .then((response)=>{
            const data = response.data;
            if(data.hasError){
                console.log(data.errorMessage);
                return
            }
            const appleToken = data.authorizationToken;
            AppleMusicUserAuthorization.getUserToken(appleToken,(error, result) => {
                if(error){
                    Alert.alert(error);
                } 
                else{
                    console.log(result);
                    Alert.alert(result);
                }
                
            });
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
