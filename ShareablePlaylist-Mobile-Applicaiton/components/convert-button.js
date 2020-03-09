import React from 'react'
import useValidateURL from './customHooks/use-validate-url';
import {styles} from '../style/main.style';
import { View, Image, Text } from 'react-native'


function ConvertButton({url}) {
    const urlType = useValidateURL(url);
    
    if(urlType == 'SPOTIFY'){
        return (
            <View style={styles.logoButtonContainer}>
                <Image source={require('../assets/apple-logo.png')} style={styles.logoButton}/>
            </View>
        )
    }

    if(urlType == 'APPLE'){
        return (
            <View style={styles.logoButtonContainer}>
                <Image source={require('../assets/spotify-logo.png')} style={styles.logoButton}/>   
            </View>
        )
    }

    return (
        <View>
            <Text>BAH</Text>
        </View>
    )
}

export default ConvertButton;
