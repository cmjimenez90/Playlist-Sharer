import React from 'react'
import {View} from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'

const Help = () => {
    return (
        <View style={styles.screen}>
            <BaseTitle style={{fontSize: 30}}>How to use Playlist Sharer?</BaseTitle>
            <BaseText>
                COMING SOON...
                Playlist Sharer FAQ
            </BaseText>
        </View>
    )
}

export default Help
