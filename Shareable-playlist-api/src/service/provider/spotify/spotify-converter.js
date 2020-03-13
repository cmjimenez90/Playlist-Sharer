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
      if (results.albums.items.length < 1) {
        return null;
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
      const filteredAlbum = filterAlbumResult(response);
      if (filteredAlbum === null) {
        return album;
      }
      const convertedAlbum = new Album(album.name, album.artist, filteredAlbum.external_urls.spotify);
      return convertedAlbum;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertSong(song) {
    function filterTrackResults(results) {
      if (results.tracks.items.length < 1) {
        return null;
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
      const filteredTrack = filterTrackResults(response);
      if (filteredTrack === null) {
        return song;
      }
      const covertedSong = new Song(song.name, song.artist, song.releaseAlbum, filteredTrack.external_urls.spotify);
      return covertedSong;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const songs = songsToConvert.map((song) => {
      return this.asyncConvertSong(song);
    });
    const convertedPlaylist = new Playlist(playlist.name);
    const convertedSongs = await Promise.all(songs);
    convertedPlaylist.songs = convertedSongs.filter((item)=>{
      return (item.url !== null && item.url !== '');
    });
    return convertedPlaylist;
  };
};
