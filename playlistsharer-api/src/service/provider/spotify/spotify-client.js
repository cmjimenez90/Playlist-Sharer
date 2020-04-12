'use strict';
import axios from 'axios';
import {ClientError, CLIENT_ERROR_STATES} from '../types/client-error';

/**
 * @class
 * @classdesc Spotify Music Client to handle Request to Spotify
 */
export default class SpotifyClient {
  /**
   * @constructor
   * @param {string} applicationToken - application jwt token for request authoriztion
   */
  constructor(applicationToken) {
    this.axiosClient = axios.create({
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: `Bearer ${applicationToken}`,
      },
    });
  }

  /**
   * Retreive song from Spotify Music catalog
   * @async
   * @param {string} songID - id of the song to retreive
   * @return {object} data or response error
   */
  async asyncGetSong(songID) {
    const songURL = '/tracks';
    try {
      const response = await this.axiosClient.get(`${songURL}/${songID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Retreive album from Spotify Music catalog
   * @async
   * @param {string} albumID - id of the album to retreive
   * @return {object} data or response error
   */
  async asyncGetAlbum(albumID) {
    const albumURL = '/albums';
    try {
      const response = await this.axiosClient.get(`${albumURL}/${albumID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Retreive playlist from Spotify Music catalog
   * @async
   * @param {string} playlistID - id of the playlist to retreive
   * @return {object} data or response error
   */
  async asyncGetPlaylist(playlistID) {
    const playlistURL = '/playlists';
    try {
      const response = await this.axiosClient.get(`${playlistURL}/${playlistID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Retreive user details from Spotify Music catalog
   * @async
   * @param {string} userAccessToken - access token from the enduser
   * @return {object} data or response error
   */
  async asyncGetUserDetails(userAccessToken) {
    const userURL = '/me';
    try {
      const response = await this.axiosClient.get(userURL, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        }});
      return response.data;
    } catch (error) {
      console.log(error.response.status);
      return this.handleErrorResponse(error);
    }
  }

  /**
  * Create an empty playlist in the enduser's spotify account
  * @async
  * @param {string} userAccessToken - enduser's access token
  * @param {string} userID - userID of the enduser's spotify account
  * @param {string} playlistName - name of the playlist to create
  * @return {object} data or response error
  */
  async asyncCreatePlaylist(userAccessToken, userID, playlistName) {
    const createPlaylistURL = `users/${userID}/playlists`;
    try {
      const response = await this.axiosClient.post(
          createPlaylistURL,
          {
            name: playlistName,
          },
          {
            headers: {
              'Authorization': `Bearer ${userAccessToken}`,
              'Content-Type': 'application/json',
            },
          });
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  /**
   * Add songs to the enduser's playlist
   * @param {string} userAccessToken - enduser's access token
   * @param {string} playlistID  - id of the playlist to add songs to
   * @param {Array} songIDs - array of song id's
   * @return {object} data or response error
   */
  async asyncAddSongsToPlaylist(userAccessToken, playlistID, songIDs) {
    // max submission is 100 at a time
    const playlistURL = `/playlists/${playlistID}/tracks`;
    const songURIs = songIDs.map((id)=>{
      return `spotify:track:${id}`;
    });
    const totalRequestNeeded = Math.ceil(songURIs.length / 100);
    let missingPlaylist = false;
    for (let requestNumber = 0; requestNumber < totalRequestNeeded; requestNumber++) {
      const requestSongs = songURIs.slice(requestNumber*100, requestNumber*100+100);
      try {
        await this.axiosClient.post(
            playlistURL,
            {
              uris: requestSongs,
            },
            {
              headers: {
                'Authorization': `Bearer ${userAccessToken}`,
                'Content-Type': 'application/json',
              },
            });
      } catch (error) {
        missingPlaylist = true;
      }
    }
    return {
      playlistID: playlistID,
      missingPlaylist: missingPlaylist,
    };
  }


  /**
   * Searches the spotify music catalog
   * @async
   * @param {Array} itemTypes - Array of item types to search for: TRACKS,ALBUM,PLAYLIST
   * @param {string} query  - Search term used to query the Apple Music catalog
   * @return {object} response data or error
   */
  async asyncSearch(itemTypes, query) {
    const searchURL = '/search';
    const types = itemTypes.reduce((prev, current)=>{
      return `${prev},${current}`;
    });
    const constructedQuery = encodeURI(`q=${query}&type=${types}`);

    try {
      const response = await this.axiosClient.get(`${searchURL}?${constructedQuery}`);
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
      const status = error.response.status;
      switch (status) {
        case 400:
          return new ClientError(CLIENT_ERROR_STATES.REQUEST_ERROR, 'REQUEST WAS RECIEVED INCORRECTLY');
        case 401:
          return new ClientError(CLIENT_ERROR_STATES.AUTHORIZATION, 'TOKEN IS EXPIRED, INVALID, OR MISSING');
        case 429:
          return new ClientError(CLIENT_ERROR_STATES.RATE_LIMIT, 'RATE LIMIT IN EFFECT... RETRY AT LATER TIME');
        default:
          return new ClientError(CLIENT_ERROR_STATES.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
      }
    }
    return new ClientError(CLIENT_ERROR_STATES.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
  }
};
