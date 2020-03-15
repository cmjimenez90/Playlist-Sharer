import {Router} from 'express';

import SpotifyAuthorizationHandler from '../../../service/authorization/spotify-authorization-handler';
import AppleAuthorizationHandler from '../../../service/authorization/apple-authorization-handler';
import UrlIdentifier from '../../../service/provider/url-identifier';
import AppleMusicClient from '../../../service/provider/apple/apple-music-client';
import SpotifyClient from '../../../service/provider/spotify/spotify-client';
import ConversionHandler from '../../../service/provider/conversion-handler';

const router = new Router();

const appleAuthHandler = new AppleAuthorizationHandler();
const spotifyAuthHandler = new SpotifyAuthorizationHandler();

const verifyAuthroizationHeader = (req, res, next) => {
  if (req.headers['authorization']) {
    next();
  } else {
    return res.status(401).send({
      error: 'UNAUTHORIZED',
      message: 'Authorization Token is required',
    });
  };
};

router.get('/', function(req, res) {
  res.send('ShareablePlaylist API V1');
});

// Request relating to Spotify Music
router.post('/spotify-music', verifyAuthroizationHeader, async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    return res.status(400).send('Missing Item URL');
  }
  const spotifyClientToken = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(spotifyClientToken.access_token);
  const appleClient = new AppleMusicClient(appleAuthHandler.asyncGenerateDeveloperToken());
  const conversionHandler = new ConversionHandler(spotifyClient, appleClient);

  const requestURL = req.body['itemURL'];
  try {
    const conversionResult = await conversionHandler.asyncConvertURLtoSpotifyMusic(requestURL);
    res.send(conversionResult);
  } catch (error) {
    return res.status(500).send({
      'error': 'SERVER ERROR',
      'message': error.message,
    });
  }
});

router.get('/spotify-music', async function(req, res) {
  if (!req.query.url) {
    return res.status(400).send('Please send a URL to retrieve');
  }
  const requestURL = req.query.url;
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform !== 'spotify') {
    return res.status(400).send('Invalid URL');
  }

  const token = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(token.access_token);
  let clientResponse = null;
  switch (acceptableProviderURL.type) {
    case 'track':
      const songID = acceptableProviderURL.destination.split('/')[1];
      clientResponse = await spotifyClient.asyncGetSong(songID);
      break;
    case 'album':
      const albumID = acceptableProviderURL.destination.split('/')[1];
      clientResponse = await spotifyClient.asyncGetAlbum(albumID);
      break;
    case 'playlist':
      const playlistID = acceptableProviderURL.destination.split('/')[1];
      clientResponse = await spotifyClient.asyncGetPlaylist(playlistID);
      break;
    default: return res.status(400).send('trouble converting the stream url');
  }
  return res.send(clientResponse);
});

// Request relating to Apple Music
router.post('/apple-music', verifyAuthroizationHeader, async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    return res.status(400).send('Missing Item URL');
  }
  const spotifyClientToken = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(spotifyClientToken.access_token);
  const appleClient = new AppleMusicClient(appleAuthHandler.asyncGenerateDeveloperToken());
  const conversionHandler = new ConversionHandler(spotifyClient, appleClient);

  const requestURL = req.body['itemURL'];

  try {
    const conversionResult = await conversionHandler.asyncConvertURLToAppleMusic(requestURL);
    res.send(conversionResult);
  } catch (error) {
    return res.status(500).send({
      'error': 'SERVER ERROR',
      'message': error.message,
    });
  }
});

router.get('/apple-music', async function(req, res) {
  if (!req.query.url) {
    return res.status(400).send('Please send a URL to retrieve');
  }
  const requestURL = req.query.url;
  console.log(requestURL);
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform !== 'apple') {
    res.status(400).send('Invalid URL');
  }

  const appleClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());
  let clientResponse = null;
  switch (acceptableProviderURL.type) {
    case 'song':
      const songID = acceptableProviderURL.destination;
      clientResponse = await appleClient.asyncGetSong(songID);
      break;
    case 'album':
      const albumID = acceptableProviderURL.destination.split('/')[1];
      clientResponse = await appleClient.asyncGetAlbum(albumID);
      break;

    case 'playlist':
      const playlistID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await appleClient.asyncGetPlaylist(playlistID);
      break;
    default: res.status(400).send('Oops, something went wrong');
  }
  res.send(clientResponse[0]);
});
export default router;
