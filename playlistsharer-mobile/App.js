import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import React from 'react';

import {AuthorizationProvider} from './components/authorization/AuthorizationContext';
import AppNavigator from './screens/AppNavigator';
import {color} from './style/playlistsharer.style';

export default function App() {

  return(
      <AuthorizationProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: color.secondary}}>
          <NavigationContainer>
            <AppNavigator/>
          </NavigationContainer>
        </SafeAreaView>
      </AuthorizationProvider>
)}

