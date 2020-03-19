import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {color} from '../style/main.style';
import MainScreen from './converter/MainScreen';
import SignInScreen from './authentication/SignInScreen';
import SpotifyAuthScreen from './authentication/SpotifyAuthScreen';
import useAuthentication from '../authentication/useAuthentication';
export default AppNavigator = ()  =>{
    const Stack = createStackNavigator();
    const {isUserAuthenticated} = useAuthentication();
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
            title: 'Playlist Sharer',
          }}
          initialRouteName={ isUserAuthenticated()? 'MainScreen' : 'SignInScreen'}
         >
          <Stack.Screen name='SignInScreen' component={SignInScreen} />
          <Stack.Screen name='SpotifyAuthScreen' component={SpotifyAuthScreen}/>
          <Stack.Screen name='MainScreen' component={MainScreen} />
        </Stack.Navigator>
    )
}
