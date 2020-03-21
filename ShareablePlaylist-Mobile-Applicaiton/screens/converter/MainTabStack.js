import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color} from '../../style/main.style';
import MainScreen from './MainScreen';
import AccountScreen from './AccountScreen';
import { Ionicons } from  '@expo/vector-icons';
const MainTab = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
        tabBarOptions={{
            inactiveBackgroundColor: color.primary,
            activeBackgroundColor: color.secondary,
            activeTintColor: color.accent,
            inactiveTintColor: color.secondary
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if(route.name === 'MainTab'){
                iconName = 'md-home'
              }
              else if(route.name === 'AccountScreen'){
                iconName = 'md-settings'
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
            <Tab.Screen name='MainTab' component={MainScreen} />
            <Tab.Screen name='AccountScreen' component={AccountScreen} />
        </Tab.Navigator>
    )
}

export default MainTab;
