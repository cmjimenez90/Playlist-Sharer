import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {color} from '../../style/playlistsharer.style'

const BaseText = ({children, style}) => {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    )
}

export default BaseText

const styles = StyleSheet.create({
    text: {
        color: color.secondary,
        fontSize: 18
    }
})
