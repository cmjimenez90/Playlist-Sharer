import React from 'react'

import {StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {constants} from '../app-config'
import {color} from '../style/playlistsharer.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StackNavBackButton from '../components/base/StackNavBackButton'

import Main from './Main';
import Help from './Help';
import Authorization from './Authorization';
import Converter from './Converter';

const AppNavigator = ()  => {  
  const Stack = createStackNavigator();
 
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: color.secondary,
      },
      headerTintColor: color.accent,
    }}>
          <Stack.Screen name='Main' component={Main} options={({navigation})=>({
            headerTitle: constants.APP_NAME,
            headerRight: () => (
              <TouchableOpacity style={component.helpButton} onPress={()=>{navigation.navigate('Help')}}>
                <Ionicons name="md-information-circle-outline" size={32} color={color.accent}/>
              </TouchableOpacity>
            ),
            })}/>
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Authorization" component={Authorization} />
            <Stack.Screen name="Converter" component={Converter} options={({navigation})=>({
              headerLeft: () =>(
                <StackNavBackButton navigation={navigation}/>
              ),
             })}/>
    </Stack.Navigator>
  )
}

const component = StyleSheet.create({
  helpButton: {
    marginRight: 15
  }
})

export default AppNavigator;
