import React from 'react'
import {ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../style/main.style';

export default SpotifyPlatfromButton = ({onPress}) => {
    
    return (
       <TouchableOpacity onPress={onPress} style={styles.musicPlatformButton}>
           <ImageBackground source={require('../assets/spotify-logo.png')} style={styles.musicPlatformImage}/>
       </TouchableOpacity>
    )
}
