import React from 'react'
import {  View, ActivityIndicator } from 'react-native'

import {styles} from '../../style/main.style';

const LoadingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

export default LoadingScreen
