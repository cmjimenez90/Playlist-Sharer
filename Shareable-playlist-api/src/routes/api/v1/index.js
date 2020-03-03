import {Router} from 'express';

import SpotifyAuthorizationHandler from '../../../service/authorization/spotify-authorization-handler';
import AppleAuthorizationHandler from '../../../service/authorization/apple-authorization-handler';
import UrlIdentifier from '../../../service/provider/url-identifier';
import AppleMusicClient from '../../../service/provider/apple/apple-music-client';
import SpotifyMusicClient from '../../../service/provider/spotify/spotify-client';

const router = new Router();
const appleAuthHandler = new AppleAuthorizationHandler();
const spotifyAuthHandler = new SpotifyAuthorizationHandler();


router.get('/', function(req, res) {
  res.send('ShareablePlaylist API V1');
});

router.post('/spotify-music', async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    res.status(400).send('Missing Item URL');
  }
  const requestURL = req.body['itemURL'];
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform === 'spotify') {
    res.send(requestURL);
  }

  const appleClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());

  let clientResponse = null;
  switch (acceptableProviderURL.type) {
    case 'song':
      const songID = acceptableProviderURL.destination;
      clientResponse = await appleClient.asyncGetSong(songID);
      break;
    case 'album':
      const albumID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await appleClient.asyncGetAlbum(albumID);
      break;
    case 'playlist':
      res.send('playlist');
      break;
    default: res.send('Well this should have never happened. Please try again!');
  }

  res.send(clientResponse);
});

router.post('/apple-music', async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    res.status(400).send('Missing Item URL');
  }

  const requestURL = req.body['itemURL'];
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform === 'apple') {
    res.send(requestURL);
  }

  res.send('I WILL CONVERT');
});

export default router;
