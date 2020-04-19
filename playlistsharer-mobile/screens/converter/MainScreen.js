import React from 'react'
import { View, Text} from 'react-native'
import {styles} from '../../style/main.style';

import URLConversionForm from '../../components/URLConversionForm';

const MainScreen = ({navigation, url}) => {

    return (
        <View style={styles.container}>
            { 
            url ? (
                <Text>WE HAVE A URL</Text>
            ) : (
               <URLConversionForm /> 
            )}
        </View>
    )
}

export default MainScreen
