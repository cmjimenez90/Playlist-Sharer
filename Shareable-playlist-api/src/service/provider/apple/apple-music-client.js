'use strict';
import axios from 'axios';
import {ClientError, CLIENT_ERROR_STATES} from '../types/client-error';

/**
 * @class
 * @classdesc Apple Music Client to handle request to the Apple Music API
 */
export default class AppleMusicClient {
  /**
   * @constructor
   * @param {string} developerToken - apple developer token
   */
  constructor(developerToken) {
    this.axiosClient = axios.create({
      baseURL: 'https://api.music.apple.com',
      headers: {
        Authorization: `Bearer ${developerToken}`,
      },
    });
  }

  /**
   * Retreives a song from the Apple Music Catalog
   * @param {string} songID - id of the Apple Music song to retreive
   * @param {string} [storefront = us] - country code to retreive against
   * @async
   * @return {object} response data or error
   */
  async asyncGetSong(songID, storefront='us') {
    const songURL = `/v1/catalog/${storefront}/songs/${songID}`;
    try {
      const response = await this.axiosClient.get(songURL);
      return response.data.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   *  Retreives an album from the Apple Music Catalog
   * @param {string} albumID  - id of the Apple Music album to retreive
   * @param {string} [storefront = us] - country code to retreive against
   * @async
   * @return {object} response data or error
   */
  async asyncGetAlbum(albumID, storefront='us') {
    const albumURL = `/v1/catalog/${storefront}/albums/${albumID}`;
    try {
      const response = await this.axiosClient.get(albumURL);
      return response.data.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Retreives a playlist from the Apple Music Catalog
   * @param {string} playlistID - id of the Apple Music playlist to retreive
   * @param {string } [storefront = us] - country code to retreive against
   * @async
   * @return {object} response data or error
   */
  async asyncGetPlaylist(playlistID, storefront='us') {
    const playlistURL = `/v1/catalog/${storefront}/playlists/${playlistID}`;
    try {
      const response = await this.axiosClient.get(playlistURL);
      return response.data.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Searches the apple music catalog
   * @param {Array} itemTypes - Array of item types to search for: SONG,ALBUM,PLAYLIST
   * @param {string} term  - Search term used to query the Apple Music catalog
   * @param {string } [storefront = us] - country code to retreive against
   * @param {int} [limit = 25] - number of results to retrieve, 25 is max
   * @async
   * @return {object} response data or error
   */
  async asyncSearch(itemTypes, term, storefront='us', limit = 25) {
    const searchURL = `/v1/catalog/${storefront}/search`;
    const types = itemTypes.reduce((prev, current)=>{
      return `${prev},${current}`;
    });
    const constructedQuery = encodeURI(`?term=${term}&limit=${limit}&types=${types}`);
    try {
      const response = await this.axiosClient.get(`${searchURL}${constructedQuery}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Creates a playlist in an enduser's Apple Music Library
   * @param {string} userMusicToken - enduser's apple music user token
   * @param {string} playlistName  - name of the playlist to create
   * @async
   * @return {object} response data or error
   */
  async asyncCreatePlaylist(userMusicToken, playlistName) {
    const newPlaylistURL = '/v1/me/library/playlists';
    try {
      const response = await this.axiosClient.post(
          newPlaylistURL,
          {
            attributes: {
              name: playlistName,
              description: 'Playlist copied with Playlist Sharer',
            },
          }, {
            headers: {
              'Music-User-Token': userMusicToken,
            },
          },
      );
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Create and populate a playlist in an enduser's account
   * @param {string} userMusicToken - enduser's Apple Music user token
   * @param {string} playlistName - name of the playlist to create in the enduser's library
   * @param {Array} playlistSongIDs - array of song IDs
   * @async
   * @return {object} response data or error
   */
  async asyncCreatePlaylist(userMusicToken, playlistName, playlistSongIDs) {
    const newPlaylistURL = '/v1/me/library/playlists';

    const songIDs = [];
    playlistSongIDs.forEach((songID) => {
      const songData = {
        id: songID,
        type: 'songs',
      };
      songIDs.push(songData);
    });

    try {
      const response = await this.axiosClient.post(newPlaylistURL,
          {
            attributes: {
              name: playlistName,
              description: 'Playlist copied with Playlist Sharer',
            },
            relationships: {
              tracks: {
                data: songIDs,
              },
            },
          }, {
            headers: {
              'Music-User-Token': userMusicToken,
            }},
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Add songs to an enduser's playlist
   * @param {string} userMusicToken - enduser's Apple Music user token
   * @param {string} playlistID - id of the playlist to modify
   * @param {Array} playlistSongIDs - array of song IDs to add to the playlist
   * @return {object} response data
   * @async
   */
  async asyncAddSongToPlaylist(userMusicToken, playlistID, playlistSongIDs) {
    const addSongsToPlaylistURL = `/v1/me/library/playlists/${playlistID}/tracks`;

    const songIDs = [];

    playlistSongIDs.forEach((songID) => {
      const songData = {
        id: songID,
        type: 'songs',
      };
      songIDs.push(songData);
    });
    try {
      const response = await this.axiosClient.post(
          addSongsToPlaylistURL,
          {
            data: songIDs,
          }, {
            headers: {
              'Music-User-Token': userMusicToken,
            },
          },
      );
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Parses the error response from http request
   * @param {Error} error - error object from http response\
   * @return {ClientError}
   */
  handleErrorResponse(error) {
    if (error.response) {
      console.log(error.response.data.errors);
      switch (error.response.status) {
        case 400:
          return new ClientError(CLIENT_ERROR_STATES.REQUEST_ERROR, 'REQUEST WAS RECIEVED INCORRECTLY');
        case 401:
          return new ClientError(CLIENT_ERROR_STATES.AUTHORIZATION, 'TOKEN IS EXPIRED, INVALID, OR MISSING');
        case 413:
          return new ClientError(CLIENT_ERROR_STATES.PAYLOAD_SIZE, 'REQUEST WAS TOO LARGE');
        case 429:
          return new ClientError(CLIENT_ERROR_STATES.RATE_LIMIT, 'RATE LIMIT IN EFFECT... RETRY AT LATER TIME');
        default:
          return new ClientError(CLIENT_ERROR_STATES.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
      }
    }
    return new ClientError(CLIENT_ERROR_STATES.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
  }
}
