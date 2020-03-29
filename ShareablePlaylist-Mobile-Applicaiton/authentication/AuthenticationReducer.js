'use strict';
export const DefaultState = {
    isSpotifyAuthorized: false,
    spotifyToken: null,
    spotifyExpiration: null,
    spotifyRefreshToken: null,
    isAppleAuthorized: false,
    appleToken: null,
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'AuthorizeSpotify':
            return {
                ...state,
                isSpotifyAuthorized: true,
                spotifyToken: action.payload.access_token,
                spotifyExpiration: action.payload.expires_in,
                spotifyRefreshToken: action.payload.refresh_token
            };
        case 'SignOutSpotify':
            return {
                ...state,
                isSpotifyAuthorized: false,
                spotifyToken: null,
                spotifyExpiration: null,
                spotifyRefreshToken: null,
            };
        case 'AuthorizeApple':
            return {
                ...state,
                isAppleAuthorized: true,
                appleToken: action.payload.music_user_token
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
                spotifyExpiration: null,
                spotifyRefreshToken: null,
                isAppleAuthorized: false,
                appleToken: null,
            };
        default:
            return state;
    }
};

