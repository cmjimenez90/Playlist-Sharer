'use strict';

/* eslint-disable max-len */
import axios from 'axios';
import queryString from 'qs';
import config from '../../config/server-config';


export default class SpotifyAuthorizationHandler {
  constructor() {
    this.authorizeURI = 'https://accounts.spotify.com/authorize';
    this. tokenURI = 'https://accounts.spotify.com/api/token';
    this.clientID = config.SPOTIFY_CLIENTID;
    this.redirectURI = config.SPOTIFY_REDIRECT_URI;
    this.clientSecret = config.SPOTIFY_SECRET;
  }

  createAuthorizationHeader() {
    const requestAuthorizationDetails = `${this.clientID}:${this.clientSecret}`;
    const postConfig = {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(requestAuthorizationDetails).toString('base64'),
      },
    };
    return postConfig;
  }

  getSpotifyAuthorizationUri() {
    const urlParameters = new URLSearchParams({
      client_id: this.clientID,
      response_type: 'code',
      redirect_uri: this.redirectURI,
    });
    console.log(this.redirectURI);
    console.log(urlParameters);
    const authorizationUrl = new URL(this.authorizeURI);
    authorizationUrl.search = urlParameters;
    return authorizationUrl;
  }

  async asyncHandleSpotifyCallback(code) {
    const postParameters = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectURI,
      client_id: this.clientID,
      client_secret: this.clientSecret,
    };
    const data = queryString.stringify(postParameters);
    try {
      const result = await axios.post(this.tokenURI, data);
      return result.data;
    } catch (error) {
      return {
        error: 'CALLBACK FAILURE',
        message: error,
      };
    }
  }

  async asyncRefreshSpotifyToken(refreshToken) {
    const postConfig = this.createAuthorizationHeader();
    const postParameters = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const data = queryString.stringify(postParameters);
    try {
      const response = await axios.post(this.tokenURI, data, postConfig);
      return response.data;
    } catch (error) {
      return {
        error: 'REFRESH FAILURE',
        message: error,
      };
    }
  }

  async asyncGenerateClientCredential() {
    const postConfig = this.createAuthorizationHeader();
    const postParameters = {
      grant_type: 'client_credentials',
    };
    const data = queryString.stringify(postParameters);
    try {
      const response = await axios.post(this.tokenURI, data, postConfig);
      return response.data;
    } catch (error) {
      return {
        error: 'CLIENT AUTH FAILURE',
        message: error,
      };
    }
  }
};
