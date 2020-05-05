import React from 'react'
import { Image, View, Text } from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'
import ImageButton from '../components/base/ImageButton'

const Main = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <View style={styles.textContainer}>
                        <BaseTitle>Playlist Sharer</BaseTitle>
                        <BaseText style={styles.caption}>My Platform, Your Platform,</BaseText>
                        <BaseText style={styles.caption}><BaseText style={[styles.caption,{fontStyle: "italic",fontWeight: "bold"}]}>ANY</BaseText> Platform</BaseText>
                    </View>
                    <Image source={require('../assets/psicon.png')} style={styles.logoImage}/>
                </View>
                <BaseText style={styles.buttonContainerHeader}>Select your music platform</BaseText>
                <View style={styles.buttonContainer}>
                    <ImageButton source={require('../assets/apple-listen-logo.png')}/>
                    <ImageButton source={require('../assets/spotify-logox150.png')}/>
                </View>
            </View>
        </View>
    )
}

export default Main
