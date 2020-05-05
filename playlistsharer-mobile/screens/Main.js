import React from 'react'
import { Image, View, Text } from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'
import ImageButton from '../components/base/ImageButton'

const Main = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/psicon.png')} style={styles.logoImage}/>
            <View style={styles.textContainer}>
                <BaseTitle>Playlist Sharer</BaseTitle>
                <BaseText>My platform, your platform, ANY platform</BaseText>
            </View>
            <BaseText style={styles.buttonContainerHeader}>Select your music platform</BaseText>
            <View style={styles.buttonContainer}>
                <ImageButton source={require('../assets/apple-listen-logo.png')}/>
                <ImageButton source={require('../assets/spotify-logox150.png')}/>
            </View>
        </View>
    )
}

export default Main
