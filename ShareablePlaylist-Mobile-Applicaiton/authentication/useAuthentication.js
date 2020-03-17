import React, {useContext, useEffect} from 'react'
import {AuthenticationContext} from './AuthenticationContext';

export default useAuthentication = () => {
    const [state,action] = useContext(AuthenticationContext);


    const isUserAuthenticated = () => {
        console.log(state);
        if(state.isSpotifyAuthorized || state.isAppleAuthorized){
            return true;
        }
        return false;
    };
    
    return {isUserAuthenticated}
}
