import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {color} from '../../style/playlistsharer.style';
import { StyleSheet } from 'react-native'
const StackNavBackButton = ({navigation}) => {
    return (
       <TouchableOpacity style={styles.backButton} onPress={() => {navigation.popToTop()}}>
           <Ionicons name="md-arrow-back" size={24} color={color.accent}/>
       </TouchableOpacity>
    )
}

export default StackNavBackButton

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 20
    }
})