import React from 'react'
import { View, Text } from 'react-native'

import {styles} from '../../style/main.style';
import SignIn from '../../components/SignIn/SignIn';
const SignInScreen = () => {
    return (
        <View style={styles.container}>
           <SignIn></SignIn> 
        </View>
    )
}

export default SignInScreen
