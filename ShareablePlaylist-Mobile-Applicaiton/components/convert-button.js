import React from 'react'
import {styles} from '../style/main.style';
import { View, Image, TouchableOpacity } from 'react-native'


function ConvertButton({url}) {
        return (
            <View style={styles.logoButtonContainer}>
                <TouchableOpacity>
                    <Image source={require('../assets/apple-logo.png')} style={styles.logoButton}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/spotify-logo.png')} style={styles.logoButton}/>
                </TouchableOpacity>
            </View>
        )
}

export default ConvertButton;
