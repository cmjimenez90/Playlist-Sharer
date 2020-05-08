import React, {useReducer} from 'react'
import AsyncStorage from '@react-native-community/async-storage';

import { constants } from '../app-config'
const actionType = {
    authorizeSpotify: "AUTHORIZE_SPOTIFY",
    authorizeApple: "AUTHORIZE_APPLE",
    removeSpotifyAuthorization: "REMOVE_SPOTIFY",
    removeAppleAuthorization: "REMOVE_APPLE"
}

const AuthorizationReducer =  (state, action) => {
    switch (action.type) {
        case actionType.authorizeSpotify:
            AsyncStorage.setItem(constants.LOCALSTORE_SPOTIFY_AUTHORIZATION,JSON.stringify(action.payload))
                .then()
                .catch((error) => {
                    console.error("Failed to save to local storage");
                    console.error(error);
                });
            return {
                ...state,
                spotifyAuthorization: action.payload
            }
        default:
            return state;
    }
}

const AuthorizationContext = React.createContext({});

const AuthorizationProvider = ({children}) => {
    const [state,action] = useReducer(AuthorizationReducer,{});

    return (
        <AuthorizationContext.Provider value={[state,action]}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export {AuthorizationProvider, AuthorizationContext, actionType};