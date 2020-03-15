'use strict';
import URLidentifier from './url-identifier';
import Song from './types/song';
import Album from './types/album';
import Playlist from './types/playlist';
import AppleConverter from './apple/apple-music-converter';
import SpotifyConverter from './spotify/spotify-converter';
import ConversionResult from './types/conversion-result';

export default class ConversionHandler {
  constructor(spotifyClient, appleClient) {
    this.spotifyClient = spotifyClient;
    this.appleClient = appleClient;
  };

  async asyncConvertURLToAppleMusic(url, userToken) {
    const identifiedURL = URLidentifier.identify(url);
    if (identifiedURL.platform === 'apple') {
      return new ConversionResult(url);
    }
    const appleConverter = new AppleConverter(this.appleClient);
    const URLType = identifiedURL.type;
    let clientResponse = null;
    switch (URLType) {
      case 'song':
        const songID = identifiedURL.destination.split('/')[1];
        clientResponse = await this.spotifyClient.asyncGetSong(songID);
        const spotifySong = new Song(clientResponse.name, clientResponse.artists[0].name, clientResponse.album.name);
        const convertedSong = await appleConverter.asyncConvertSong(spotifySong);
        if (convertedSong.error) {
          return new ConversionResult('', true, convertedSong.error);
        }
        return new ConversionResult(convertedSong.url);
      case 'album':
        const albumID = identifiedURL.destination.split('/')[2];
        clientResponse = await this.spotifyClient.asyncGetAlbum(albumID);
        const spotifyAlbum = new Album(clientResponse.name, clientResponse.artists[0].name);
        const convertedAlbum = await appleConverter.asyncConvertAlbum(spotifyAlbum);
        if (convertedSong.error) {
          return new ConversionResult('', true, convertedAlbum.error);
        }
        return new ConversionResult(convertedAlbum.url);
      case 'playlist':
      default:
        return new ConversionResult('', true, 'SERVER ERROR', 'BAD NEWS BEARS');
    }
  }

  async asyncConvertURLtoSpotifyMusic(url, userToken) {
    const identifiedURL = URLidentifier.identify(url);
    if (identifiedURL.platform === 'spotify') {
      return new ConversionResult(url);
    }
    const spotifyConverter = new SpotifyConverter(this.spotifyClient);
    const URLType = identifiedURL.type;
    let clientResponse = null;
    switch (URLType) {
      case 'song':
        const songID = identifiedURL.destination;
        clientResponse = await this.appleClient.asyncGetSong(songID);
        if (clientResponse[0]) {
          const details = clientResponse[0].attributes;
          const song = new Song(details.name, details.artistName, details.albumName);
          const convertedSong = await spotifyConverter.asyncConvertSong(song);
          return new ConversionResult(convertedSong.url);
        }
      case 'album':
        const albumID = identifiedURL.destination.split('/')[2];
        clientResponse = await this.appleClient.asyncGetAlbum(albumID);
        if (clientResponse[0]) {
          const details = clientResponse[0].attributes;
          const album = new Album(details.name, details.artistName);
          const convertedAlbum = await spotifyConverter.asyncConvertAlbum(album);
          return new ConversionResult(convertedAlbum.url);
        }
      case 'playlist':
        const playlistID = identifiedURL.destination.split('/')[2];
        clientResponse = await this.appleClient.asyncGetPlaylist(playlistID);
        if (clientResponse[0]) {
          const tracks = clientResponse[0].relationships.tracks.data;
          const playlistTracks = tracks.map((track) => {
            return new Song(track.attributes.name, track.attributes.artistName, track.attributes.albumName);
          });
          const playlist = new Playlist(clientResponse[0].attributes.name, playlistTracks);
          const convertedPlaylist = await spotifyConverter.asyncConvertPlaylist(playlist);
          const userDetails = await this.spotifyClient.asyncGetUserDetails(userToken);
          if (userDetails.error) {
            return new ConversionResult('', true, userDetails.error, userDetails.message);
          }
          const newPlaylist = await this.spotifyClient.asyncCreatePlaylist(userToken, userDetails.id, convertedPlaylist.name);
          if (newPlaylist.error) {
            return new ConversionResult('', true, userDetails.error, userDetails.message);
          }
          const songIds = convertedPlaylist.songs.filter((song) => song.hasOwnProperty('url')).map((song) => song.url.split('/track/')[1]);
          await this.spotifyClient.asyncAddSongsToPlaylist(userToken, newPlaylist.id, songIds);
          return new ConversionResult(newPlaylist.external_urls.spotify);
        }
      default:
        return new ConversionResult('', true, 'SERVER ERROR', 'BAD NEWS BEARS');
    }
  }
}
