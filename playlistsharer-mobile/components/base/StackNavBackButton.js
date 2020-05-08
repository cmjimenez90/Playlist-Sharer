import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {color} from '../../style/playlistsharer.style';
import { StyleSheet } from 'react-native'
const StackNavBackButton = ({onPress}) => {
    return (
       <TouchableOpacity style={styles.backButton} onPress={onPress}>
           <Ionicons name="ios-arrow-back" size={25} color={color.accent}/>
       </TouchableOpacity>
    )
}

export default StackNavBackButton

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 20
    }
})