import {styles} from './style/main.style'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shareable Playlists</Text>
      </View>
      <View style={styles.baseContainer}>

      </View>
    </View>
)}

