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
    let searchTerm = `${album.name}+${album.artist}`;
    searchTerm = searchTerm.replace(' ', '+');
    try {
      const response = await this.appleMusicClient.asyncSearch(['albums'], searchTerm);
      const matchingAlbums = response.results.albums.data;
      const matched = matchingAlbums.filter((item)=> {
        const attributes = item.attributes;
        return (attributes.name == album.name);
      });
      const convertedAlbum = new Album(matched[0].attributes.name, matched[0].attributes.artistName, matched[0].attributes.url);
      return convertedAlbum;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertSong(song) {
    let searchTerm = `${song.name}+${song.artist}+${song.releaseAlbum}`;
    searchTerm = searchTerm.replace(' ', '+');
    try {
      const response = await this.appleMusicClient.asyncSearch(['songs'], searchTerm);
      const matchingSongs = response.results.songs.data;
      const matched = matchingSongs.filter((item)=> {
        const attributes = item.attributes;
        return (attributes.name == song.name);
      });
      const convertedSong = new Song(matched[0].attributes.name, matched[0].attributes.artistName, matched[0].attributes.albumName, matched[0].attributes.url);
      return convertedSong;
    } catch (error) {
      console.log(error);
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
