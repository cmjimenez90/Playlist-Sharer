'use strict';
import ProviderConverter from '../base/provider-converter';
import Album from '../types/album';
import Playlist from '../types/playlist';
import Song from '../types/song';

export default class SpotifyConverter extends ProviderConverter {
  constructor(spotifyClient) {
    super();
    this.client = spotifyClient;
  };

  async asyncConvertAlbum(album) {
    // Filter results to return the closet match
    function filterAlbumResult(results) {
      if (results.albums.items.length <= 1) {
        return results.albums.items[0];
      }

      const match = results.albums.items.filter((item) => {
        if (item.name = album.name && item.type == 'album') {
          return true;
        }
        return false;
      });
      return match[0];
    }

    const query = `${album.name} artist:${album.artist}`;
    const types = ['album'];
    try {
      const response = await this.client.asyncSearch(types, query);
      const url = filterAlbumResult(response).external_urls.spotify;
      const convertedAlbum = new Album(album.name, album.artist, url);
      return convertedAlbum;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertSong(song) {
    function filterTrackResults(results) {
      if (results.tracks.items.length <= 1) {
        return results.tracks.items[0];
      }

      const match = results.tracks.items.filter((item) => {
        if (item.name = song.name && item.type == 'track') {
          return true;
        }
        return false;
      });
      return match[0];
    }

    const query = `${song.name} artist:${song.artist}`;
    const types = ['track'];
    try {
      const response = await this.client.asyncSearch(types, query);
      const url = filterTrackResults(response).external_urls.spotify;
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
