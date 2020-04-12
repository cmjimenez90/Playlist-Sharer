import React from 'react'
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import {styles, color} from '../style/main.style'

const URLConversionResult = ({url, onPress}) => {

    return (
        <View style={styles.urlConversionResult}>
            <Text style={styles.urlConversionResultHeader}>
                {(!url) ? "Doing a little magic" : "Converted Item"}
            </Text>
            <View style={styles.urlConversionResultBody}>
            {
               (!url) ? <ActivityIndicator color={color.secondary} size="large"></ActivityIndicator> : ( 
                <TouchableOpacity onPress={onPress}><Text style={styles.urlConversionResultBodyText}>{url}</Text></TouchableOpacity>
               )
            }
            </View>
        </View>
    )
}

export default URLConversionResult
