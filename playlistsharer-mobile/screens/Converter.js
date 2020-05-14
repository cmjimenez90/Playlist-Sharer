import React from 'react'
import {View} from 'react-native'
import {styles} from '../style/playlistsharer.style'

import PlatformConverter from '../components/converter/PlatformConverter'

const Converter = ({route}) => {
    const { platform } = route.params

    return (
        <View style={styles.screen}>
           <PlatformConverter platform={platform}/>
        </View>
    )
}

export default Converter
