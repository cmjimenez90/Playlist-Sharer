'use strict';
import axios from 'axios';
import ClientError from '../types/client-error';

export default class SpotifyClient {
  constructor(applicationToken) {
    this.axiosClient = axios.create({
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: `Bearer ${applicationToken}`,
      },
    });
  }

  async asyncGetSong(songID) {
    const songURL = '/tracks';
    try {
      const response = await this.axiosClient.get(`${songURL}/${songID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }
  async asyncGetAlbum(albumID) {
    const albumURL = '/albums';
    try {
      const response = await this.axiosClient.get(`${albumURL}/${albumID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }
  async asyncGetPlaylist(playlistID) {
    const playlistURL = '/playlists';
    try {
      const response = await this.axiosClient.get(`${playlistURL}/${playlistID}`);
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  async asyncGetUserDetails(userAccessToken) {
    const userURL = '/me';
    try {
      const response = await this.axiosClient.get(userURL, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        }});
      return response.data;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

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
  handleErrorResponse(error) {
    if (error.response) {
      switch (error.response.status) {
        case '400':
          return new ClientError(ClientError.REQUEST_ERROR, 'REQUEST WAS RECIEVED INCORRECTLY');
        case '401':
          return new ClientError(ClientError.AUTHORIZATION, 'TOKEN IS EXPIRED, INVALID, OR MISSING');
        case '429':
          return new ClientError(ClientError.RATE_LIMIT, 'RATE LIMIT IN EFFECT... RETRY AT LATER TIME');
        default:
          return new ClientError(ClientError.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
      }
    }
    return new ClientError(ClientError.SERVER_ERROR, 'UNKNOWN ERROR HAS OCCURED');
  }
};
