import React from 'react'
import {View,Text} from 'react-native';
import ApplePlatformButton from '../ApplePlatformButton';
import SpotifyPlatfromButton from '../SpotifyPlatfromButton'
import { styles } from '../../style/main.style';
export default SignIn = () => {
    
    return (
        <View style={styles.signInScreen}>
            <View style={styles.textContainer}>
                <Text style={styles.textContainerHeader}>Welcome to Playlist Sharer..</Text>
                <Text>Please sign in to your music stream platform of choice:</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ApplePlatformButton></ApplePlatformButton>
                <SpotifyPlatfromButton></SpotifyPlatfromButton>
            </View>
        </View>
    )
}
