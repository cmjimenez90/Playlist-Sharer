import React from 'react'
import { View, Text} from 'react-native'

import {styles} from '../../style/main.style';
import ApplePlatformButton from '../../components/ApplePlatformButton';
import SpotifyPlatfromButton from '../../components/SpotifyPlatfromButton';

const SignInScreen = ({navigation}) => {

    const handleSpotifyAuthorization = () => {
        navigation.navigate('SpotifyAuthScreen');
    };

    const handleAppleAuthorization = () => {
        navigation.navigate('AppleAuthScreen');
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
