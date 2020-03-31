import Song from '../../provider/types/song';
import Album from '../../provider/types/album';
import Playlist from '../../provider/types/playlist';
import ProviderConverter from '../../provider/base/provider-converter';

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
        return album;
      }
      const matched = filterAlbumResults(results);
      const convertedAlbum = new Album(matched.attributes.name, matched.attributes.artistName, matched.attributes.url);
      return convertedAlbum;
    } catch (error) {
      return error;
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
        return song;
      }
      const matched = filterSongResults(results);
      const convertedSong = new Song(matched.attributes.name, matched.attributes.artistName, matched.attributes.albumName, matched.attributes.url);
      return convertedSong;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  async asyncConvertPlaylist(playlist) {
    const songsToConvert = playlist.songs;
    const convertedSongs = songsToConvert.map(async (song) => {
      return await this.asyncConvertSong(song);
    });
    const convertedPlaylist = new Playlist(playlist.name);
    const awaitedSongs = await Promise.all(convertedSongs);
    convertedPlaylist.songs = awaitedSongs;
    return convertedPlaylist;
  };
};
