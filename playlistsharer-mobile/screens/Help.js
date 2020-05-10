import React from 'react'
import {View} from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'

const Help = () => {

    return (
        <View style={styles.screen}>
            <BaseTitle>How to use Playlist Sharer?</BaseTitle>
            <BaseText>
                We got this...
            </BaseText>
        </View>
    )
}

export default Help
