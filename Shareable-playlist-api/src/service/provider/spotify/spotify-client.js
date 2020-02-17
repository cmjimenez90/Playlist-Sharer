'use strict';
import axios from 'axios';

export default class SpotifyClient {
  constructor(applicationToken) {
    this.axiosClient = axios.create({
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: `Bearer ${applicationToken}`,
      },
    });
  }

  async getSong(songID) {
    const songURL = '/tracks';
    try {
      const response = await this.axiosClient.get(`${songURL}/${songID}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async getAlbum(albumID) {
    const albumURL = '/albums';
    try {
      const response = await this.axiosClient.get(`${albumURL}/${albumID}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async getPlaylist(playlistID) {
    const playlistURL = '/playlists';
    try {
      const response = await this.axiosClient.get(`${playlistURL}/${playlistID}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getUserDetails(userAccessToken) {
    const userURL = '/me';
    try {
      const response = await this.axiosClient.get(userURL, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        }});
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async createPlaylist(userAccessToken, userID, playlistName, songIDs) {

  }

  async search(itemTypes, query) {
    const searchURL = '/search';
    const types = itemTypes.reduce((prev, current)=>{
      return `${prev},${current}`
      ;
    });
    const constructedQuery = encodeURI(`q=${query}&type=${types}`);
    console.log(constructedQuery);
    try {
      const response = await this.axiosClient.get(`${searchURL}?${constructedQuery}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
};
