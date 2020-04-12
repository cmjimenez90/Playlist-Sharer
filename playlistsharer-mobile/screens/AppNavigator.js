import React,{ useState, useEffect, useContext } from 'react'
import AuthorizationStorage from '../authorization/AuthorizationStorage';
import { AuthorizationContext } from '../authorization/AuthorizationContext';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthorization from '../authorization/useAuthorization';
import AuthorizationStack from './authorization/AuthorizationStack';
import MainStack from './converter/MainStack';
import LoadingScreen from './authorization/LoadingScreen';

const AppNavigator = ()  => {  

  const [storageLoaded, setLoaded] = useState(false);
  const authorizationStorage = new AuthorizationStorage();
  const {isUserAuthorized} = useAuthorization();
  const [state, action] = useContext(AuthorizationContext);
  const Stack = createStackNavigator();

  useEffect(() => {
    if(storageLoaded === false){
      authorizationStorage.asyncLoadAuthorizationFromStore().then( (data) =>
        {
          if(data !== null){
            if(data.spotify_authorization.isAuthorized){
              action({type:'AuthorizeSpotify', payload: data.spotify_authorization})
            }
            if(data.apple_authorization.isAuthorized){
              action({type:'AuthorizeApple', payload: data.apple_authorization})
            }
          }
      }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
      setLoaded(true);
    }
  },[]);

  if(storageLoaded === false){
    return (
      <Stack.Navigator>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      </Stack.Navigator>
    )
  }

  return (
    isUserAuthorized() ? (
      <MainStack/>
    ) : (
      <AuthorizationStack />
    )
  )
}

export default AppNavigator;
