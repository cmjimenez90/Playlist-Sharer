import ProviderConverter from '../../provider/base/provider-converter';

export default class AppleMusicConverter extends ProviderConverter {
  constructor(appleMusicClient) {
    super();
    this.appleMusicClient = appleMusicClient;
  };

  async asyncConvertAlbum(album) {
    const searchTerm = `${album.name}+${album.artist}`;

    this.appleMusicClient.asyncSearch([albums], searchTerm, 'US');
  };

  async asyncConvertSong(song) {

  };

  async asyncConvertPlaylist(userAccessToken, playlist) {

  };
};
