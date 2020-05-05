import React from 'react'
import { Text, StyleSheet } from 'react-native'
import BaseText from './BaseText'

const BaseTitle = ({children}) => {
    return (
        <BaseText>
            <Text style={styles.title}>{children}</Text>
        </BaseText>
    )
}

export default BaseTitle


const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        fontWeight: "600",
    }
})
