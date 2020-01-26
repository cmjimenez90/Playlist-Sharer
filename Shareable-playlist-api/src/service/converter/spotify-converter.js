'use strict';
import Converter from './converter';
import axios from 'axios';

export default class SpotifyConverter extends Converter {
  constructor(accessToken) {
    super();
    this.searchPath = '/search';
    this.config = {
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };
  convertAlbum(album) {
    query = `artists:${album.artist} album:${album.name}`;
    const convertedAlbum = axios.get(this.searchPath, {
      params: {
        q: encodeURI(query),
        type: 'album',
      }}).then( (response) => {
      album = response.data.albums.items[0];
      return album.external_urls.spotify;
    }).catch((error) => {
      return null;
    });
    return convertedAlbum;
  };
  convertSong(song) {
    const q = `?q=${song.name} artist:${song.artist} album:${song.releaseAlbum}&type=track`;
    const convertedSong = axios.get(`${this.searchPath}${encodeURI(q)}`)
        .then( (response) => {
          console.log(response.status);
          console.log(response.data);
          song = response.data.tracks.items[0];
          return song.external_urls.spotify;
        }).catch((error) => {
          console.log(error);
          return null;
        });
    return convertedSong;
  };
  convertPlaylist(playlist) {};
};
