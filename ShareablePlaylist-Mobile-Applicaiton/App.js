import {styles} from './style/main.style'
import React from 'react';
import {Text, View, StatusBar} from 'react-native';

export default function App() {
  return(
    <View style={styles.container}> 
      <View style={styles.statusBar}>
        <StatusBar></StatusBar>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Playlist Sharer</Text>
      </View>
    </View>
)}

