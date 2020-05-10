import React, {useReducer, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage';

const actionType = {
    authorizeSpotify: "AUTHORIZE_SPOTIFY",
    authorizeApple: "AUTHORIZE_APPLE",
    loadStore: "LOAD_STORE"
}

const AuthorizationStateContext = React.createContext();
const AuthorizationActionContext = React.createContext();


const AuthorizationReducer =  (state, action) => {
    switch (action.type) {
        case actionType.loadStore:
            return {
                ...state,
                'SpotifyAuth': action.payload.SpotifyAuth,
                'AppleAuth': action.payload.AppleAuth
            }
        case actionType.authorizeSpotify:
            AsyncStorage.setItem('@SpotifyAuth', JSON.stringify(action.payload.SpotifyAuth))
                .then()
                .catch((error) => {
                    console.error("Failed to save to local storage");
                    console.error(error);
                });
            return {
                ...state,
                'SpotifyAuth': action.payload.SpotifyAuth
            }
        case actionType.authorizeApple:
            AsyncStorage.setItem('@AppleAuth', JSON.stringify(action.payload.AppleAuth))
                .then()
                .catch((error) => {
                    console.error("Failed to save to local storage");
                    console.error(error);
                });
            return {
                ...state,
                'AppleAuth': action.payload.AppleAuth
            }
        default:
            return state;
    }
}


const AuthorizationProvider = ({children}) => {
    const [state,action] = useReducer(AuthorizationReducer,{
        'SpotifyAuth': null,
        'AppleAuth': null
    });
    
    useEffect(() => {
        const loadDataFromStore = async () => {
            try{
                const spotifyAuth = await AsyncStorage.getItem('@SpotifyAuth');
                const appleAuth = await AsyncStorage.getItem('@AppleAuth');
                
                action({type: actionType.loadStore, payload: {
                    'SpotifyAuth': spotifyAuth,
                    'AppleAuth': appleAuth
                }});
            }
            catch(error) {
                console.error(error);
            }
        };
        loadDataFromStore();
    }, [])

    return (
        <AuthorizationStateContext.Provider value={state}>
            <AuthorizationActionContext.Provider value={action}>
                {children}
            </AuthorizationActionContext.Provider>
        </AuthorizationStateContext.Provider>
    )
}

const useAuthorizationState = () => {
    const context = React.useContext(AuthorizationStateContext);
    if(!context){
        throw new Error("Authorization Context Initialization Error");
    }
    return context;
};

const useAuthorizationAction = () => {
    const context = React.useContext(AuthorizationActionContext);
    if(!context){
        throw new Error("Authorization Context Initialization Error");
    }
    return context;
};
export {AuthorizationProvider, useAuthorizationState, useAuthorizationAction ,actionType};