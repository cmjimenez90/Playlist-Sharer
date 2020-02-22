import ProviderConverter from '../../provider/base/provider-converter';
export default class AppleMusicConverter extends ProviderConverter {
  constructor(appleMusicClient) {
    super();
    this.appleMusicClient = appleMusicClient;
  };

  async asyncConvertAlbum(album) {

  };

  async asyncConvertSong(song) {

  };

  async asyncConvertPlaylist(playlist) {

  };
};
