import React from 'react'
import useAuthentication from '../authentication/useAuthentication';
import AuthenticationStack from './authentication/AuthenticationStack';
import MainStack from './converter/MainStack';

const AppNavigator = ()  =>{  

  const {isUserAuthenticated} = useAuthentication();

  return (
    isUserAuthenticated() ? (
      <MainStack/>
    ) : (
      <AuthenticationStack />
    )
  )
}

export default AppNavigator;
