import {Router} from 'express';

import SpotifyAuthorizationHandler from '../../../service/authorization/spotify-authorization-handler';
import AppleAuthorizationHandler from '../../../service/authorization/apple-authorization-handler';
import UrlIdentifier from '../../../service/provider/url-identifier';
import AppleMusicClient from '../../../service/provider/apple/apple-music-client';
import Song from '../../../service/provider/types/song';
import Album from '../../../service/provider/types/album';
import SpotifyConverter from '../../../service/provider/spotify/spotify-converter';
import Playlist from '../../../service/provider/types/playlist';
import SpotifyClient from '../../../service/provider/spotify/spotify-client';
import AppleMusicConverter from '../../../service/provider/apple/apple-music-converter';

const router = new Router();

const appleAuthHandler = new AppleAuthorizationHandler();
const spotifyAuthHandler = new SpotifyAuthorizationHandler();

router.get('/', function(req, res) {
  res.send('ShareablePlaylist API V1');
});

router.post('/spotify-music', async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    return res.status(400).send('Missing Item URL');
  }
  const requestURL = req.body['itemURL'];
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform === 'spotify') {
    return res.send(requestURL);
  }
  const appleClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());

  const token = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyConverter = new SpotifyConverter(token.access_token);
  const spotifyClient = new SpotifyClient(token.access_token);

  let clientResponse = null;
  switch (acceptableProviderURL.type) {
    case 'song':
      const songID = acceptableProviderURL.destination;
      clientResponse = await appleClient.asyncGetSong(songID);
      if (clientResponse[0]) {
        const details = clientResponse[0].attributes;
        const song = new Song(details.name, details.artistName, details.albumName);
        try {
          const convertedSong = await spotifyConverter.asyncConvertSong(song);
          console.log(convertedSong);
          return res.send(convertedSong);
        } catch (error) {
          console.log(error);
          return res.status(400).send(error);
        }
      }
      break;

    case 'album':
      const albumID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await appleClient.asyncGetAlbum(albumID);

      if (clientResponse[0]) {
        try {
          const details = clientResponse[0].attributes;
          const album = new Album(details.name, details.artistName);
          const convertedAlbum = await spotifyConverter.asyncConvertAlbum(album);

          return res.send(convertedAlbum.url);
        } catch (error) {
          return res.status(400).send(error);
        }
      }
      break;

    case 'playlist':
      if (!req.headers['authorization']) {
        return res.status(400).send('Personal Authorization Toke Required');
      }
      const playlistID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await appleClient.asyncGetPlaylist(playlistID);
      if (clientResponse[0]) {
        const tracks = clientResponse[0].relationships.tracks.data;
        const playlistTracks = tracks.map((track) => {
          return new Song(track.attributes.name, track.attributes.artistName, track.attributes.albumName);
        });
        const playlist = new Playlist(clientResponse[0].attributes.name, playlistTracks);
        const convertedPlaylist = await spotifyConverter.asyncConvertPlaylist(playlist);
        const userToken = req.headers['authorization'].split(' ')[1];
        const userDetails = await spotifyClient.asyncGetUserDetails(userToken);
        const newPlaylist = await spotifyClient.asyncCreatePlaylist(userToken, userDetails.id, convertedPlaylist.name);
        const songIds = convertedPlaylist.songs.filter((song) => song.hasOwnProperty('url')).map((song) => song.url.split('/track/')[1]);
        await spotifyClient.asyncAddSongsToPlaylist(userToken, newPlaylist.id, songIds);
        return res.send(newPlaylist.external_urls.spotify);
      }
      break;
    default: res.status(400).send('Well this should have never happened. Please try again!');
  }
});

router.get('/spotify-music', async function(req, res) {
  if (!req.query.url) {
    return res.status(400).send('Please send a URL to convert');
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

router.post('/apple-music', async function(req, res) {
  if (!req.body || !req.body['itemURL']) {
    res.status(400).send('Missing Item URL');
  }

  const requestURL = req.body['itemURL'];
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);

  if (acceptableProviderURL.platform === 'apple') {
    res.send(requestURL);
  }

  const token = await spotifyAuthHandler.asyncGenerateClientCredential();
  const spotifyClient = new SpotifyClient(token.access_token);
  const appleClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());
  const appleConverter = new AppleMusicConverter(appleClient);

  let clientResponse = null;
  switch (acceptableProviderURL.type) {
    case 'track':
      const songID = acceptableProviderURL.destination.split('/')[1];
      clientResponse = await spotifyClient.asyncGetSong(songID);
      const spotifySong = new Song(clientResponse.name, clientResponse.artists[0].name, clientResponse.album.name);

      try {
        const convertedSong = await appleConverter.asyncConvertSong(spotifySong);
        res.send(convertedSong.url);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
    case 'album':
      const albumID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await spotifyClient.asyncGetAlbum(albumID);
      const spotifyAlbum = new Album(clientResponse.name, clientResponse.artists[0].name);
      try {
        const convertedAlbum = await appleConverter.asyncConvertAlbum(spotifyAlbum);
        res.send(convertedAlbum.url);
      } catch (error) {
        res.status(400).send();
      }
      break;

    case 'playlist':
      res.send('TBD');
      break;
    default: res.status(400).send('Oops, something went wrong');
  }
});

router.get('/apple-music', async function(req, res) {
  if (!req.query.url) {
    res.status(400).send('Please send a URL to convert');
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
