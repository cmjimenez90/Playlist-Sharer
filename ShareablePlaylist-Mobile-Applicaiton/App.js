import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {color} from './style/main.style';
import SignIn from './authentication/SignIn';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: color.secondary,
        },
        headerTintColor: color.accent,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        title: 'Playlist Sharer',
      }}>
        <Stack.Screen name='SignIn' component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
)}

