import {useContext} from 'react'
import {AuthenticationContext} from './AuthenticationContext';

export default useAuthentication = () => {
    const [state,action] = useContext(AuthenticationContext);


    const isUserAuthenticated = () => {
        if(state.isSpotifyAuthorized || state.isAppleAuthorized){
            return true;
        }
        return false;
    };

    const validateSpotifyExpiration = () => {

    };

    const validateAppleExpiration = () =>{

    };


    
    return {isUserAuthenticated}
}
