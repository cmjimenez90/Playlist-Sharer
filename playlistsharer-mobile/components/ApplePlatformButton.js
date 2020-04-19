import React from 'react'
import {Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../style/main.style';

export default ApplePlatformButton = ({onPress}) => {
    
    return (
       <TouchableOpacity onPress={onPress} style = {styles.musicPlatformButton}>
           <Image source={require('../assets/apple-listen-logo.png')} style={styles.musicPlatformImage}/>
       </TouchableOpacity>
    )
}
