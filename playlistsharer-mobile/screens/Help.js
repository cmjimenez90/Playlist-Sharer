import React from 'react'
import {View} from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'

import {useAuthorizationState} from '../components/authorization/AuthorizationContext';

const Help = () => {
    const {SpotifyAuth} = useAuthorizationState();
    
    return (
        <View style={styles.screen}>
            <BaseTitle style={[{fontSize: 38}]}>How to use Playlist Sharer?</BaseTitle>
            <BaseText>
               {
                   SpotifyAuth ?  JSON.stringify(SpotifyAuth) : "FALSE"
               }
            </BaseText>
        </View>
    )
}

export default Help
