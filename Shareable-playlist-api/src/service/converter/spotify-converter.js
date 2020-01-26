'use strict';
import Converter from './converter';
import axios from 'axios';
import Album from './entity-types/album';
import Song from './entity-types/song';

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

  async asyncConvertAlbum(album) {
    const q = `?q=${album.name} artist:${album.artist}&type=album`;
    const response = await axios.get(`${this.searchPath}${encodeURI(q)}`, this.config);

    if (response) {
      const url = response.data.albums.items[0].external_urls.spotify;
      const convertedAlbum = new Album(album.name, album.artist, url);
      return convertedAlbum;
    }

    return null;
  };

  async asyncConvertSong(song) {
    const q = `?q=${song.name} artist:${song.artist} album:${song.releaseAlbum}&type=track`;
    const response = await axios.get(`${this.searchPath}${encodeURI(q)}`, this.config);

    if (response) {
      const url = response.data.tracks.items[0].external_urls.spotify;
      const covertedSong = new Song(song.name, song.artist, song.releaseAlbum, url);
      return covertedSong;
    }

    return null;
  };

  async asyncConvertPlaylist(playlist) {};
};
