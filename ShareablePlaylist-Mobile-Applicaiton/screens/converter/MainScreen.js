import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import {styles} from '../../style/main.style';

import URLConversionFrom from '../../components/URLlConversionForm';
const MainScreen = ({navigation, url}) => {

    return (
        <View style={styles.container}>
            { 
            url ? (
                <Text>WE HAVE A URL</Text>
            ) : (
               <URLConversionFrom /> 
            )}
        </View>
    )
}

export default MainScreen
