import React from 'react'
import { Image, View } from 'react-native'
import {styles} from '../style/playlistsharer.style'
import BaseTitle from '../components/base/BaseTitle'
import BaseText from '../components/base/BaseText'
import ImageButton from '../components/base/ImageButton'
import {constants} from '../app-config'
const Main = ({navigation}) => {
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
                    <ImageButton source={require('../assets/apple-listen-logo.png')} onPress={() => {navigation.navigate("Authorization", {platform: constants.PLATFORM.APPLE})}}/>
                    <ImageButton source={require('../assets/spotify-logox150.png')} onPress={() => {navigation.navigate("Authorization", {platform: constants.PLATFORM.SPOTIFY})}}/>
                </View>
            </View>
        </View>
    )
}

export default Main
