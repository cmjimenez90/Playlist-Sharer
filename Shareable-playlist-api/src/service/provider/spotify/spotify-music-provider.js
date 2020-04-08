import Provider from '../base/provider';
import SpotifyUrlParser from './spotify-url-parser';

/**
 * @class
 * @classdesc Spotify Music Provider with URL parser
 */
export default class SpotifyMusicProvider extends Provider {
  constructor() {
    super('spotify', 'api.spotify.com', 'open.spotify.com', new SpotifyUrlParser());
  }
};
