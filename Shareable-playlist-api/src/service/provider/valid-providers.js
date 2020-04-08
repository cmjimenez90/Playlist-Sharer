import AppleMusicProvider from './apple/apple-music-provider';
import SpotifyMusicProvider from './spotify/spotify-music-provider';

/**
 * @class
 * @classdesc List of supported providers of the API
 */
export default class ValidProviders {
  constructor() {
    const appleMusicProvider = new AppleMusicProvider();
    const spotifyMusicProvider = new SpotifyMusicProvider();

    this.providers = new Map();
    this.providers.set(appleMusicProvider.rootUrl, appleMusicProvider);
    this.providers.set(spotifyMusicProvider.rootUrl, spotifyMusicProvider);
  }
}
