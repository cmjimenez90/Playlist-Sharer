'use strict';

export const DefaultState = {
    isSpotifyAuthorized: false,
    spotifyToken: null,
    isAppleAuthorized: false,
    appleToken: null,
}

export const Reducer = (state, action) =>{
    switch (action.type) {
        case 'AuthorizeSpotify':
            return {
                ...state,
                isSpotifyAuthorized: true,
                spotifyToken: action.payload
            };
        case 'SignOutSpotify':
            return {
                ...state,
                isSpotifyAuthorized: false,
                spotifyToken: null
            };
        case 'AuthorizeApple':
            return {
                ...state,
                isAppleAuthorized: true,
                appleToken: action.payload
            };
        case 'SignOutApple':
            return {
                ...state,
                isAppleAuthorized: false,
                appleToken: null,
            };
        case 'SignOutAll': 
            return {
                ...state,
                isSpotifyAuthorized: false,
                spotifyToken: null,
                isAppleAuthorized: false,
                appleToken: null,
            };
        default:
            return state;
    }
};

