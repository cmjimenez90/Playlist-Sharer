'use strict';

/* eslint-disable max-len */
import axios from 'axios';
import queryString from 'qs';
import config from '../../config/server-config';

// Spotify Authorization Handler class
export default class SpotifyAuthorizationHandler {
  /**
   * Create a Spotify Authorization Handler
   * @constructor
   */
  constructor() {
    this.authorizeURI = 'https://accounts.spotify.com/authorize';
    this. tokenURI = 'https://accounts.spotify.com/api/token';
    this.clientID = config.SPOTIFY_CLIENTID;
    this.redirectURI = config.SPOTIFY_REDIRECT_URI;
    this.clientSecret = config.SPOTIFY_SECRET;
  }

  /**
   * returns a header object that can be used in request to Spotify
   * @return {object} headers with Authorization Basic attribute
   */
  createAuthorizationHeader() {
    const requestAuthorizationDetails = `${this.clientID}:${this.clientSecret}`;
    const postConfig = {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(requestAuthorizationDetails).toString('base64'),
      },
    };
    return postConfig;
  }


  /**
   * constructs and returns the Spotify Authorzation URI required to start authorization flow for enduser
   * @return {URL} spotify authorization url with required parameters
   */
  getSpotifyAuthorizationUri() {
    const urlParameters = new URLSearchParams({
      client_id: this.clientID,
      response_type: 'code',
      redirect_uri: this.redirectURI,
      scope: 'playlist-modify-public',
    });
    const authorizationUrl = new URL(this.authorizeURI);
    authorizationUrl.search = urlParameters;
    return authorizationUrl;
  }


  /**
   * process Spotify authorization callback request
   * @param {string} code - Enduser response code returned from spotify callback request
   * @return {object} Authorization result or error response
   */
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

  /**
   * Refresh enduser's authorization token
   * @param {string} refreshToken - Enduser refresh token for renewing authorization
   * @return {object} Authorization result or error response
   */
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

  /**
   * generate Spotify Client Credentials
   * @return {object} Authorization result or error response
   */
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
