import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {color} from '../../style/main.style';
import SignInScreen from './SignInScreen';
import SpotifyAuthScreen from './SpotifyAuthScreen';
import AppleAuthScreen from './AppleAuthScreen';
export default AuthorizationStack = ()  =>{
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: color.secondary,
            },
            headerTintColor: color.accent,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          initialRouteName={'SignInScreen'}
         >
            <Stack.Screen name='SignInScreen' component={SignInScreen} />
            <Stack.Screen name='SpotifyAuthScreen' component={SpotifyAuthScreen} />
            <Stack.Screen name='AppleAuthScreen' component={AppleAuthScreen} />
        </Stack.Navigator>
    );
}
