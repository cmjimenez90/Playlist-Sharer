import axios from 'axios';
import queryString from 'qs';
import config from '../../config/server-config';

const spotifyAuthorizeUrl = 'https://accounts.spotify.com/authorize';
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';

function getSpotifyAuthorizationUri() {
  const urlParameters = new URLSearchParams({
    client_id: config.SPOTIFY_CLIENTID,
    response_type: 'code',
    redirect_uri: config.SPOTIFY_REDIRECT_URI,
  });
  const authorizationUrl = new URL(spotifyAuthorizeUrl);
  authorizationUrl.search = urlParameters;
  return authorizationUrl;
}

async function asyncHandleSpotifyCallback(code) {
  const postParameters = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: config.SPOTIFY_REDIRECT_URI,
    client_id: config.SPOTIFY_CLIENTID,
    client_secret: config.SPOTIFY_SECRET,

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

export default {getSpotifyAuthorizationUri, asyncHandleSpotifyCallback};
