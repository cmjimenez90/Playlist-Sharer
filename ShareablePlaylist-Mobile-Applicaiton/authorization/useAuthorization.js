import {useContext} from 'react'
import {AuthorizationContext} from './AuthorizationContext';

export default useAuthorization = () => {
    const [state,action] = useContext(AuthorizationContext);


    const isUserAuthorized = () => {
        if(state.isSpotifyAuthorized || state.isAppleAuthorized){
            return true;
        }
        return false;
    };
    
    return {isUserAuthorized}
}
