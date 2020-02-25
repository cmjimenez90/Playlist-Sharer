import {styles} from './style/main.style'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.baseContainer}>
      <Text style={styles.baseText}>SI love you baby</Text>
    </View>
  );
}

