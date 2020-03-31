import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MainTabStack from './MainTabStack';
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
            <stack.Screen name="Playlist Sharer" component={MainTabStack} />
        </stack.Navigator>
    )
}

export default MainStack;
