'use strict';
import ProviderConverter from '../base/provider-converter';
import {ProviderConverterResult} from '../types/provider-converter-result';
import {CLIENT_ERROR_STATES} from '../types/client-error';
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
      if (response.error) {
        console.log(response.error);
        console.log(album);
        return new ProviderConverterResult(null, true, response.error);
      }
      const matched = filterAlbumResult(response);
      if (matched) {
        const convertedAlbum = new Album(matched.name, matched.artist, matched.external_urls.spotify);
        return new ProviderConverterResult(convertedAlbum);
      }
      return new ProviderConverterResult(album);
    } catch (error) {
      console.log(error);
      return new ProviderConverterResult(null, true, CLIENT_ERROR_STATES.SERVER_ERROR);
    }
  };

  async asyncConvertSong(song) {
    function filterTrackResults(results) {
      if (results.tracks.items.length < 1) {
        return null;
      }
      const match = results.tracks.items.filter((item) => {
        if (item.name == song.name && item.type == 'track') {
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
      if (response.error) {
        console.log(response);
        console.log(song);
        return new ProviderConverterResult(null, true, response.error);
      }
      const matched = filterTrackResults(response);
      if (matched) {
        const covertedSong = new Song(matched.name, matched.artist, matched.releaseAlbum, matched.external_urls.spotify);
        return new ProviderConverterResult(covertedSong);
      }
      return new ProviderConverterResult(song);
    } catch (error) {
      console.log(error);
      return new ProviderConverterResult(null, true, CLIENT_ERROR_STATES.SERVER_ERROR);
    }
  };

  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const songs = songsToConvert.map(async (song) => {
      return this.asyncConvertSong(song);
    });
    const convertedPlaylist = new Playlist(playlist.name);
    const awaitedSongs = await Promise.all(songs);
    try {
      const validSongResults = awaitedSongs.filter((result) => {
        if (result.hasError === false && result.convertedItem.url != '') {
          return true;
        } else if (result.error === CLIENT_ERROR_STATES.AUTHORIZATION) {
          throw CLIENT_ERROR_STATES.AUTHORIZATION;
        } else {
          return false;
        }
      });
      convertedPlaylist.songs = validSongResults.map((result) => result.convertedItem);
    } catch (error) {
      return new ProviderConverterResult(null, true, error);
    }
    return new ProviderConverterResult(convertedPlaylist);
  };
};
