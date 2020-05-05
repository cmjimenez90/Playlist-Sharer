import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {constants} from '../app-config'
import {color} from '../style/playlistsharer.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Main from './Main';

const AppNavigator = ()  => {  
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: color.secondary,
      },
      headerTintColor: color.accent,
    }}>
          <Stack.Screen name='Main' component={Main} options={{
            headerTitle: constants.APP_NAME,
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 15}}>
                <Ionicons name="md-information-circle-outline" size={32} color={color.accent}/>
              </TouchableOpacity>
            ),
            }}/>
    </Stack.Navigator>
  )
}

export default AppNavigator;
