'use strict';
import axios from 'axios';
import ProviderConverter from '../base/provider-converter';
import Album from '../types/album';
import Playlist from '../types/playlist';
import Song from '../types/song';

export default class SpotifyConverter extends ProviderConverter {
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
    try {
      const response = await axios.get(`${this.searchPath}${encodeURI(q)}`, this.config);
      const url = response.data.albums.items[0].external_urls.spotify;
      const convertedAlbum = new Album(album.name, album.artist, url);
      return convertedAlbum;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertSong(song) {
    const q = `?q=${song.name} artist:${song.artist}&type=track`;

    try {
      const response = await axios.get(`${this.searchPath}${encodeURI(q)}`, this.config);
      const url = response.data.tracks.items[0].external_urls.spotify;
      const covertedSong = new Song(song.name, song.artist, song.releaseAlbum, url);
      return covertedSong;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const convertedSongs = songsToConvert.map(async (song) => {
      return this.asyncConvertSong(song);
    });

    const convertedPlaylist = new Playlist(playlist.name);
    convertedPlaylist.songs = await Promise.all(convertedSongs);
    return convertedPlaylist;
  };
};
