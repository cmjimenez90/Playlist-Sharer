import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../style/playlistsharer.style'

import SpotifyAuthorization from '../components/authorization/SpotifyAuthorization'
import AppleAuthorization from '../components/authorization/AppleAuthorization'
import {constants} from '../app-config'

const Authorization = ({route}) => {
    const { platform } = route.params

    return (
        <View style={styles.screen}>
            {(() => {
                switch(platform){
                case constants.PLATFORM.APPLE:
                    return <AppleAuthorization />
                case constants.PLATFORM.SPOTIFY:
                    return <SpotifyAuthorization />
                default: 
                    return <Text>Something Went Wrong...</Text>
            }
                })()}
        </View>
    )
}

export default Authorization
