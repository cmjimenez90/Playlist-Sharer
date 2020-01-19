/* eslint-disable max-len */
import axios from 'axios';
import queryString from 'qs';
import config from '../../../config/server-config';

const spotifyAuthorizeUrl = 'https://accounts.spotify.com/authorize';
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
const clientId = config.SPOTIFY_CLIENTID;
const redirectUri = config.SPOTIFY_REDIRECT_URI;
const clientSecret = config.SPOTIFY_SECRET;

function getSpotifyAuthorizationUri() {
  const urlParameters = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
  });
  const authorizationUrl = new URL(spotifyAuthorizeUrl);
  authorizationUrl.search = urlParameters;
  return authorizationUrl;
}

async function asyncHandleSpotifyCallback(code) {
  const postParameters = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,

  };
  const data = queryString.stringify(postParameters);
  try {
    const result = await axios.post(spotifyTokenUrl, data);
    return result.data;
  } catch (error) {
    return {
      error: 'CALLBACK FAILURE',
      message: 'SPOTIFY - NO TOKEN RETRIEVED',
    };
  }
};

async function asyncRefreshSpotifyToken(refreshToken) {
  const requestAuthorizationDetails = `${clientId}:${clientSecret}`;
  console.log(requestAuthorizationDetails);
  const postConfig = {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(requestAuthorizationDetails).toString('base64'),
    },
  };
  const postParameters = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,

  };
  const data = queryString.stringify(postParameters);
  try {
    const response = await axios.post(spotifyTokenUrl, data, postConfig);
    return response.data;
  } catch (error) {
    return {
      error: 'REFRESH FAILURE',
      message: error,
    };
  }
}

export default {
  getSpotifyAuthorizationUri,
  asyncHandleSpotifyCallback,
  asyncRefreshSpotifyToken,
};
