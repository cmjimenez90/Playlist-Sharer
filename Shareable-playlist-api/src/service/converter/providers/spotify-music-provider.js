import Provider from './provider';
import SpotifyUrlParser from '../parser/spotify-url-parser';
export default class SpotifyMusicProvider extends Provider {
  constructor() {
    super('apple', 'api.spotify.com', 'open.spotify.com', new SpotifyUrlParser());
  }
};
