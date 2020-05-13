import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color, styles } from '../../style/playlistsharer.style'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ConversionResult = ({children,style}) => {
    return (
            <TouchableOpacity style={component.touchable}>
                <Text style={[component.text, style]} numberOfLines={1}>{children}</Text> 
            </TouchableOpacity>
    )
}

export default ConversionResult

const component = StyleSheet.create({
    text: {
        padding: 10,
        color: color.secondary,
        fontSize: 20,
        textAlign: "center"
    }
})
