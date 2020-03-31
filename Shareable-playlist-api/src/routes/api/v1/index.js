import {Router} from 'express';

import SpotifyAuthorizationHandler from '../../../service/authorization/spotify-authorization-handler';
import AppleAuthorizationHandler from '../../../service/authorization/apple-authorization-handler';
import AppleMusicClient from '../../../service/provider/apple/apple-music-client';
import SpotifyClient from '../../../service/provider/spotify/spotify-client';
import ConversionHandler from '../../../service/provider/conversion-handler';
import URLRetriever from '../../../service/provider/url-retriever';

const router = new Router();

const appleAuthHandler = new AppleAuthorizationHandler();
const spotifyAuthHandler = new SpotifyAuthorizationHandler();
const urlRetriever = new URLRetriever();

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
  const appleClient = new AppleMusicClient(appleAuthHandler.generateDeveloperToken());
  const conversionHandler = new ConversionHandler(spotifyClient, appleClient);

  const requestURL = req.body['itemURL'];
  try {
    const userToken = req.headers['authorization'].split(' ')[1];
    const conversionResult = await conversionHandler.asyncConvertURLtoSpotifyMusic(requestURL, userToken);
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
  const token = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(token.access_token);

  try {
    const retrievalResult = await urlRetriever.asyncGetSpotifyURL(requestURL, spotifyClient);
    return res.send(retrievalResult);
  } catch (error) {
    return res.status(500).send({
      error: 'SERVER ERROR',
      message: error.message,
    });
  }
});

// Request relating to Apple Music
router.post('/apple-music', verifyAuthroizationHeader, async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    return res.status(400).send('Missing Item URL');
  }
  const spotifyClientToken = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(spotifyClientToken.access_token);
  const appleClient = new AppleMusicClient(appleAuthHandler.generateDeveloperToken());
  const conversionHandler = new ConversionHandler(spotifyClient, appleClient);

  const requestURL = req.body['itemURL'];

  try {
    const userToken = req.headers['authorization'].split(' ')[1];
    const conversionResult = await conversionHandler.asyncConvertURLToAppleMusic(requestURL, userToken);
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
  const appleClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());

  try {
    const retrievalResult = await urlRetriever.asyncGetAppleURL(requestURL, appleClient);
    return res.send(retrievalResult);
  } catch (error) {
    return res.status(500).send({
      error: 'SERVER ERROR',
      message: error.message,
    });
  }
});
export default router;
