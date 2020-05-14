export const config = {
    API_HOST: 'https://playlistsharer.cmjimenez.com',
    SPOTIFY_AUTH_ENDPOINT: '/authorize/spotify-music',
    SPOTIFY_CALLBACK_ENDPOINT: '/authorize/spotify-music/callback',
    SPOTIFY_REFRESH_ENDPOINT: '/authorize/spotify-music/refresh',
    APPLE_TOKEN_ENDPOINT: '/authorize/apple-music',
    APPLE_CONVERSION_ENDPOINT: '/api/v1/apple-music',
    SPOTIFY_CONVERSION_ENDPOINT: '/api/v1/spotify-music'
}

export const constants = {
    APP_NAME: 'Playlist Sharer',
    PLATFORM: {
        APPLE: "APPLE_MUSIC",
        SPOTIFY: "SPOTIFY_MUSIC"
    },
}