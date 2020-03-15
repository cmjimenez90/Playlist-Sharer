'use strict';
import UrlIdentifier from './url-identifier';
import RetrievalResult from './types/retrieval-result';

export default class URLRetriever {
  constructor() {};
  async asyncGetAppleURL(url, appleClient) {
    const identifiedURL = UrlIdentifier.identify(url);

    if (identifiedURL.platform !== 'apple') {
      return new RetrievalResult('', true, 'INVALID URL', url);
    }

    switch (identifiedURL.type) {
      case 'song':
        try {
          const songID = identifiedURL.destination;
          const songDetails = await appleClient.asyncGetSong(songID);
          return new RetrievalResult(songDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      case 'album':
        try {
          const albumID = identifiedURL.destination.split('/')[1];
          const albumDetails = await appleClient.asyncGetAlbum(albumID);
          return new RetrievalResult(albumDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      case 'playlist':
        try {
          const playlistID = identifiedURL.destination.split('/')[2];
          const playlistDetails = await appleClient.asyncGetPlaylist(playlistID);
          return new RetrievalResult(playlistDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      default:
        return new RetrievalResult('', true, 'SERVER EROOR', 'BAD NEWS BEARS');
    }
  }

  async asyncGetSpotifyURL(url, spotifyClient) {
    const identifiedURL = UrlIdentifier.identify(url);

    if (identifiedURL.platform !== 'spotify') {
      return new RetrievalResult('', true, 'INVALID URL', url);
    }

    switch (identifiedURL.type) {
      case 'song':
        try {
          const songID = identifiedURL.destination.split('/')[1];
          const songDetails = await spotifyClient.asyncGetSong(songID);
          return new RetrievalResult(songDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      case 'album':
        try {
          const albumID = identifiedURL.destination.split('/')[1];
          const albumDetails = await spotifyClient.asyncGetAlbum(albumID);
          return new RetrievalResult(albumDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      case 'playlist':
        try {
          const playlistID = identifiedURL.destination.split('/')[1];
          const playlistDetails = await spotifyClient.asyncGetPlaylist(playlistID);
          return new RetrievalResult(playlistDetails);
        } catch (error) {
          return new RetrievalResult('', true, error.error, error.message);
        }
      default:
        return new RetrievalResult('', true, 'SERVER EROOR', 'BAD NEWS BEARS');
    }
  }
};
