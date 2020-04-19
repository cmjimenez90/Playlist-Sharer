import {useContext} from 'react';
import {NativeModules} from 'react-native';
import {AuthorizationContext} from './AuthorizationContext';
import AuthorizationStorage from './AuthorizationStorage';

import axios from 'axios';

export default useAuthorization = () => {
    const [state,action] = useContext(AuthorizationContext);
    const authorizationStorage = new AuthorizationStorage();
   
    const isUserAuthorized = () => {
        if(state.isSpotifyAuthorized || state.isAppleAuthorized){
            return true;
        }
        return false;
    };

    const unauthorizeAppleMusic = () => {
        authorizationStorage.asyncClearAppleFromStore().then(
            (data) => {
                if(data){
                    action({type: 'SignOutApple'})
                }
            }
        ).catch((error) => {
            console.log(error);
        });  
    }

    const unauthorizeSpotifyMusic = () => {
        authorizationStorage.asyncClearSpotifyFromStore().then(
            (data) => {
                if(data){
                    action({type: 'SignOutSpotify'})
                }
            }
        ).catch((error) => {
            console.log(error);
        });  
    }
    
    return {isUserAuthorized,unauthorizeAppleMusic,unauthorizeSpotifyMusic}
}
