import {styles} from './style/main.style'
import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import UrlDisplay from './components/url-display';
import ConvertButton from './components/convert-button';
export default function App() {
  return(
    <View style={styles.container}> 
      <View style={styles.statusBar}>
        <StatusBar />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shareable Playlists</Text>
      </View>
      <View style={styles.body}>
        <UrlDisplay url="https://music.apple.com/us/album/i-love-me/1501001885?i=1501002276"></UrlDisplay>
        <ConvertButton url="https://music.apple.com/us/album/i-love-me/1501001885?i=1501002276"></ConvertButton>
      </View>
    </View>
)}

