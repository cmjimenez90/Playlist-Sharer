import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../style/playlistsharer.style'

import SpotifyAuthorization from '../components/authorization/SpotifyAuthorization'
import AppleAuthorization from '../components/authorization/AppleAuthorization'

const Authorization = ({route}) => {
    const { platform } = route.params

    return (
        <View style={styles.screen}>
            {(() => {
                switch(platform){
                case "APPLE_MUSIC":
                    return <AppleAuthorization />
                case "SPOTIFY_MUSIC":
                    return <SpotifyAuthorization testString={"SPOTIFY"}/>
                default: 
                    return <Text>Something Went Wrong...</Text>
            }
                })()}
        </View>
    )
}

export default Authorization
