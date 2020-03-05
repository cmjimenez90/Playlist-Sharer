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

const router = new Router();

const appleAuthHandler = new AppleAuthorizationHandler();
const spotifyAuthHandler = new SpotifyAuthorizationHandler();

router.get('/', function(req, res) {
  res.send('ShareablePlaylist API V1');
});

router.post('/spotify-music', async function(req, res) {
  if (!req.body || !req.body['itemURL'] || !req.headers['authorization']) {
    res.status(400).send('Missing Item URL');
  }
  const requestURL = req.body['itemURL'];
  const acceptableProviderURL = UrlIdentifier.identify(requestURL);
  if (acceptableProviderURL.platform === 'spotify') {
    res.send(requestURL);
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
          res.send(convertedSong);
        } catch (error) {
          res.status(400).send(error);
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

          res.send(convertedAlbum);
        } catch (error) {
          res.status(400).send(error);
        }
      }
      break;

    case 'playlist':
      const playlistID = acceptableProviderURL.destination.split('/')[2];
      clientResponse = await appleClient.asyncGetPlaylist(playlistID);
      if (clientResponse[0]) {
        const tracks = clientResponse[0].relationships.tracks.data;
        const playlistTracks = tracks.map((track) => {
          return new Song(track.attributes.name, track.attributes.artistName, track.attributes.albumName);
        });
        const playlist = new Playlist(clientResponse[0].attributes.name, playlistTracks);
        console.log(token.access_token);
        const convertedPlaylist = await spotifyConverter.asyncConvertPlaylist(playlist);
        const userToken = req.headers['authorization'].split(' ')[1];
        const userDetails = await spotifyClient.asyncGetUserDetails(userToken);
        const newPlaylist = await spotifyClient.asyncCreatePlaylist(userToken, userDetails.id, convertedPlaylist.name);
        const songIds = convertedPlaylist.songs.filter((song) => song.hasOwnProperty('url')).map((song) => song.url.split('/track/')[1]);
        await spotifyClient.asyncAddSongsToPlaylist(userToken, newPlaylist.id, songIds);
        res.send(newPlaylist.external_urls.spotify);
      }
      break;
    default: res.status(400).send('Well this should have never happened. Please try again!');
  }
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
