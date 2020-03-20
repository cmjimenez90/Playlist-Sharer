import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import {color} from '../../style/main.style';

const MainStack = () => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator 
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
        >
            <stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Playlist Sharer' }}/>
        </stack.Navigator>
    )
}

export default MainStack;
