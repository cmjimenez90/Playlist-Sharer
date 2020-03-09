import {styles} from './style/main.style'
import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import UrlDisplay from './components/url-display';
export default function App() {
  return(
    <View style={styles.container}> 
      <View style={styles.statusBar}>
        <StatusBar></StatusBar>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shareable Playlists</Text>
      </View>
      <UrlDisplay url="https://open.spotify.com/playlist/37i9dQZF1DX4zbZrYRGVam"></UrlDisplay>
    </View>
)}

