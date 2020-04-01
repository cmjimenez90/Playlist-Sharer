import Song from '../../provider/types/song';
import Album from '../../provider/types/album';
import Playlist from '../../provider/types/playlist';
import ProviderConverter from '../../provider/base/provider-converter';
import {ProviderConverterResult} from '../types/provider-converter-result';
import {CLIENT_ERROR_STATES} from '../types/client-error';

export default class AppleMusicConverter extends ProviderConverter {
  constructor(appleMusicClient) {
    super();
    this.appleMusicClient = appleMusicClient;
  };

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

  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const convertedSongResults = songsToConvert.map(async (song) => {
      return this.asyncConvertSong(song);
    });

    const convertedPlaylist = new Playlist(playlist.name);
    const awaitedSongs = await Promise.all(convertedSongResults);

    try {
      convertedPlaylist.songs = awaitedSongs.filter((result) => {
        if (result.hasError === false) {
          return true;
        } else if (result.error === CLIENT_ERROR_STATES.AUTHORIZATION) {
          throw CLIENT_ERROR_STATES.AUTHORIZATION;
        }
      });
    } catch (error) {
      return new ProviderConverterResult(null, true, CLIENT_ERROR_STATES.AUTHORIZATION);
    }

    return new ProviderConverterResult(convertedPlaylist);
  };
};

