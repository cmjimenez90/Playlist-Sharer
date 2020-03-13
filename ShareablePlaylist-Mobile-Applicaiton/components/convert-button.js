import React from 'react'
import {styles} from '../style/main.style';
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import useConversionAPI from './customHooks/use-conversion-api';

function ConvertButton({url}) {

    const convertedURL = useConversionAPI(url)

        return (
            <View style={styles.logoButtonContainer}>
                <TouchableOpacity>
                    <Image source={require('../assets/apple-logo.png')} style={styles.logoButton} onPress={()=>Alert.alert(convertedURL)}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/spotify-logo.png')} style={styles.logoButton} onPress={()=>Alert.alert(convertedURL)}/>
                </TouchableOpacity>
            </View>
        )
}

export default ConvertButton;
