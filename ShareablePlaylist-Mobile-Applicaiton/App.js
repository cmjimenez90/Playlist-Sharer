import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import {AuthenticationProvider} from './authentication/AuthenticationContext';
import AppNavigator from './screens/AppNavigator';

export default function App() {

  return(
      <AuthenticationProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
    </AuthenticationProvider>
)}

