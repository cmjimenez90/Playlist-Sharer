import Song from '../../provider/types/song';
import ProviderConverter from '../../provider/base/provider-converter';

export default class AppleMusicConverter extends ProviderConverter {
  constructor(appleMusicClient) {
    super();
    this.appleMusicClient = appleMusicClient;
  };

  async asyncConvertAlbum(album) {

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
      console.log(convertedSong);
      return convertedSong;
    } catch (error) {
      return error;
    }
  };

  async asyncConvertPlaylist(userAccessToken, playlist) {

  };
};
