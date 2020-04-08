import Song from '../../provider/types/song';
import Album from '../../provider/types/album';
import Playlist from '../../provider/types/playlist';
import ProviderConverter from '../../provider/base/provider-converter';
import {ProviderConverterResult} from '../types/provider-converter-result';
import {CLIENT_ERROR_STATES} from '../types/client-error';

/**
 * @class
 * @classdesc Apple Music Converter to convert Item types to their respective URLs
 * @extends ProviderConverter
 */
export default class AppleMusicConverter extends ProviderConverter {
  /**
   * @constructor
   * @param {AppleMusicClient} appleMusicClient - AppleMusicClient for converter request
   */
  constructor(appleMusicClient) {
    super();
    this.appleMusicClient = appleMusicClient;
  };

  /**
   * Convert an album to an Apple Music Album
   * @async
   * @param {Album} album - album object representing album to be converted
   * @return {ProviderConverterResult} converted result
   */
  async asyncConvertAlbum(album) {
    function filterAlbumResults(results) {
      if (results.results.albums.data.length < 1) {
        return null;
      }

      const match = results.results.albums.data.filter((item) => {
        if (item.attributes.name = album.name) {
          return true;
        }
        return false;
      });
      return match[0];
    }
    let searchTerm = `${album.name}+${album.artist}`;
    searchTerm = searchTerm.replace(' ', '+');
    try {
      const results = await this.appleMusicClient.asyncSearch(['albums'], searchTerm);
      if (results.error) {
        console.log(results);
        console.log(album);
        return new ProviderConverterResult(null, true, results.error);
      }
      const matched = filterAlbumResults(results);
      if (matched) {
        const convertedAlbum = new Album(matched.attributes.name, matched.attributes.artistName, matched.attributes.url);
        return new ProviderConverterResult(convertedAlbum);
      }
      return new ProviderConverterResult(album);
    } catch (error) {
      console.log(error);
      return new ProviderConverterResult(null, true, CLIENT_ERROR_STATES.SERVER_ERROR);
    }
  };

  /**
   * Convert a song to an Apple Music song
   * @async
   * @param {song} song - song object representing album to be converted
   * @return {ProviderConverterResult} converted result
   */
  async asyncConvertSong(song) {
    function filterSongResults(results) {
      if (results.results.songs.data.length < 1) {
        return null;
      }

      const match = results.results.songs.data.filter((item) => {
        if (item.attributes.name = song.name) {
          return true;
        }
        return false;
      });
      return match[0];
    }

    let searchTerm = `${song.name}+${song.artist}+${song.releaseAlbum}`;
    searchTerm = searchTerm.replace(' ', '+');
    try {
      const results = await this.appleMusicClient.asyncSearch(['songs'], searchTerm);
      if (results.error) {
        console.log(results);
        console.log(song);
        return new ProviderConverterResult(null, true, results.error);
      }
      const matched = filterSongResults(results);
      if (matched) {
        const convertedSong = new Song(matched.attributes.name, matched.attributes.artistName, matched.attributes.albumName, matched.attributes.url);
        return new ProviderConverterResult(convertedSong);
      }
      return new ProviderConverterResult(song);
    } catch (error) {
      console.log(error.message);
      return new ProviderConverterResult(null, true, CLIENT_ERROR_STATES.SERVER_ERROR);
    }
  };

  /**
   * Convert a playlist to an Apple Music Playlist
   * @async
   * @param {Playlist} playlist - album object representing album to be converted
   * @return {ProviderConverterResult} converted result
   */
  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const convertedSongResults = songsToConvert.map(async (song) => {
      return this.asyncConvertSong(song);
    });

    const convertedPlaylist = new Playlist(playlist.name);
    const awaitedSongs = await Promise.all(convertedSongResults);

    try {
      const validSongResults = awaitedSongs.filter((result) => {
        if (result.hasError === false && result.convertedItem.url != '') {
          return true;
        } else if (result.error === CLIENT_ERROR_STATES.AUTHORIZATION) {
          // exits out of the conversion if the api token has expired
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

