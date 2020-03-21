import React,{ useState, useEffect, useContext } from 'react'
import {AuthenticationContext} from '../authentication/AuthenticationContext'
import useAuthentication from '../authentication/useAuthentication';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationStack from './authentication/AuthenticationStack';
import MainStack from './converter/MainStack';

import AuthenticationStorage from '../authentication/AuthenticationStorage';
import LoadingScreen from './authentication/LoadingScreen';

const AppNavigator = ()  =>{  

  const [storageLoaded, setLoaded] = useState(false);
  const authenticationStorage = new AuthenticationStorage();
  const [state, action] = useContext(AuthenticationContext);
  const {isUserAuthenticated} = useAuthentication();

  const Stack = createStackNavigator();

  useEffect(() => {
    if(storageLoaded === false){
       authenticationStorage.asyncLoadAuthenticationFromStore().then( (data) =>
        {
          if(data !== null){
            action({type:'AuthorizeSpotify', payload: data})
          }
      }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
      setLoaded(true);
    }
  },[storageLoaded]);

  if(storageLoaded === false){
    return (
      <Stack.Navigator>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      </Stack.Navigator>
    )
  }

  return (
    isUserAuthenticated() ? (
      <MainStack/>
    ) : (
      <AuthenticationStack />
    )
  )
}

export default AppNavigator;
