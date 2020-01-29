import Provider from '../base/provider';
import SpotifyUrlParser from './spotify-url-parser';
export default class SpotifyMusicProvider extends Provider {
  constructor() {
    super('apple', 'api.spotify.com', 'open.spotify.com', new SpotifyUrlParser());
  }
};
