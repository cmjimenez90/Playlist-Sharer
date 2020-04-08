'use strict';
import URLidentifier from './url-identifier';
import Song from './types/song';
import Album from './types/album';
import Playlist from './types/playlist';
import AppleConverter from './apple/apple-music-converter';
import SpotifyConverter from './spotify/spotify-converter';
import ConversionResult from './types/conversion-result';

/**
 * @class
 * @classdesc Conversion Handler manages url conversions between Spotify and Apple Music. Acts as the service for the api.
 */
export default class ConversionHandler {
  /**
   * @constructor
   * @param {SpotifyClient} spotifyClient - Spotify Music Client
   * @param {AppleMusicClient} appleClient - Apple Music Client
   */
  constructor(spotifyClient, appleClient) {
    this.spotifyClient = spotifyClient;
    this.appleClient = appleClient;
  };

  /**
   * Converts supplied url to an Apple Music equivelant
   * @async
   * @param {URL} url - url to be converted to Apple Music
   * @param {string} userToken - Apple Music User Token for request on behalf of the end user
   * @return {ConversionResult}
   */
  async asyncConvertURLToAppleMusic(url, userToken) {
    const identifiedURL = URLidentifier.identify(url);

    // if url is already an Apple Music URL just return it to the user
    if (identifiedURL.platform === 'apple') {
      return new ConversionResult(url);
    }

    const appleConverter = new AppleConverter(this.appleClient);
    const URLType = identifiedURL.type;
    let clientResponse = null;
    // eslint-disable-next-line prefer-const
    let convertedProviderResult = null;
    // Convert the url based on its parsed type
    switch (URLType) {
      case 'song':
        const songID = identifiedURL.destination.split('/')[1];
        clientResponse = await this.spotifyClient.asyncGetSong(songID);
        const spotifySong = new Song(clientResponse.name, clientResponse.artists[0].name, clientResponse.album.name);
        convertedProviderResult = await appleConverter.asyncConvertSong(spotifySong);
        if (convertedProviderResult.hasError) {
          return new ConversionResult('', true, convertedProviderResult.errorStatus);
        }
        return new ConversionResult(convertedProviderResult.convertedItem.url);
      case 'album':
        const albumID = identifiedURL.destination.split('/')[1];
        clientResponse = await this.spotifyClient.asyncGetAlbum(albumID);
        const spotifyAlbum = new Album(clientResponse.name, clientResponse.artists[0].name);
        convertedProviderResult = await appleConverter.asyncConvertAlbum(spotifyAlbum);
        if (convertedProviderResult.hasError) {
          return new ConversionResult('', true, convertedProviderResult.errorStatus);
        }
        return new ConversionResult(convertedProviderResult.convertedItem.url);
      case 'playlist':
        const playlistID = identifiedURL.destination.split('/')[1];
        clientResponse = await this.spotifyClient.asyncGetPlaylist(playlistID);
        const playlistTracksPage = clientResponse.tracks;
        const actualPlaylistTracks = playlistTracksPage.items.filter((playlistTrack) => {
          try {
            return playlistTrack.track.type === 'track';
          } catch (error) {
            console.log(error.message);
            return false;
          }
        });

        const spotifyPlaylistSongs = actualPlaylistTracks.map((playlistTrack) => {
          try {
            const song = new Song(playlistTrack.track.name, playlistTrack.track.artists[0].name, playlistTrack.track.album.name);
            return song;
          } catch (error) {
            console.log(error);
          }
        });
        const playlist = new Playlist(clientResponse.name, spotifyPlaylistSongs);
        convertedProviderResult = await appleConverter.asyncConvertPlaylist(playlist);
        if (convertedProviderResult.hasError) {
          return new ConversionResult('', true, convertedProviderResult.errorStatus);
        }
        const songIDs = convertedProviderResult.convertedItem.songs.filter((song) => song.url !== '').map((song)=> song.url.split('?i=')[1]);
        const newPlaylist = await this.appleClient.asyncCreatePlaylist(userToken, convertedProviderResult.convertedItem.name, songIDs);
        return new ConversionResult(`https://music.apple.com${newPlaylist.data[0].href}`);
      default:
        return new ConversionResult('', true, 'SERVER ERROR');
    }
  }

  /**
   * Converts supplied url to an Spotify equivelant
   * @async
   * @param {URL} url - url to be converted to Spotify
   * @param {string} userToken - Spotify User Token for request on behalf of the end user
   * @return {ConversionResult}
   */
  async asyncConvertURLtoSpotifyMusic(url, userToken) {
    const identifiedURL = URLidentifier.identify(url);

    // if url is already a Spotify URL just return it to the user
    if (identifiedURL.platform === 'spotify') {
      return new ConversionResult(url);
    }
    const spotifyConverter = new SpotifyConverter(this.spotifyClient);
    const URLType = identifiedURL.type;
    let clientResponse = null;
    // eslint-disable-next-line prefer-const
    let convertedProviderResult = null;

    // Convert the url based on its parsed type
    switch (URLType) {
      case 'song':
        const songID = identifiedURL.destination;
        clientResponse = await this.appleClient.asyncGetSong(songID);
        if (clientResponse[0]) {
          const details = clientResponse[0].attributes;
          const song = new Song(details.name, details.artistName, details.albumName);
          convertedProviderResult = await spotifyConverter.asyncConvertSong(song);
          if (convertedProviderResult.hasError) {
            return new ConversionResult(null, true, convertedProviderResult.errorStatus, convertedProviderResult.errorStatus);
          }
          return new ConversionResult(convertedProviderResult.convertedItem.url);
        }
      case 'album':
        const albumID = identifiedURL.destination.split('/')[2];
        clientResponse = await this.appleClient.asyncGetAlbum(albumID);
        if (clientResponse[0]) {
          const details = clientResponse[0].attributes;
          const album = new Album(details.name, details.artistName);
          convertedProviderResult = await spotifyConverter.asyncConvertAlbum(album);
          if (convertedProviderResult.hasError) {
            return new ConversionResult(null, true, convertedProviderResult.errorStatus, convertedProviderResult.errorStatus);
          }
          return new ConversionResult(convertedProviderResult.convertedItem.url);
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
          convertedProviderResult = await spotifyConverter.asyncConvertPlaylist(playlist);
          if (convertedProviderResult.hasError) {
            return new ConversionResult(null, true, convertedProviderResult.errorStatus, convertedProviderResult.errorStatus);
          }
          const convertedPlaylist = convertedProviderResult.convertedItem;
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
        return new ConversionResult('', true, 'SERVER ERROR');
    }
  }
}
