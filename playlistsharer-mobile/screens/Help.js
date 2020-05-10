import React from 'react'
import {View} from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'

import {useAuthorizationState} from '../components/authorization/AuthorizationContext';

const Help = () => {
    const {SpotifyAuth, AppleAuth} = useAuthorizationState();
    
    return (
        <View style={styles.screen}>
            <BaseTitle>How to use Playlist Sharer?</BaseTitle>
            <BaseText>
                {JSON.stringify(SpotifyAuth)}
            </BaseText>
            <BaseText>
                {JSON.stringify(AppleAuth)}
            </BaseText>
        </View>
    )
}

export default Help
