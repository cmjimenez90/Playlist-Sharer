'use strict';
import ParsedProviderURL from '../base/provider-url';

/**
 * @class
 * @classdesc Spotify Music Parser to parse URL and store url attributes
 */
export default class SpotifyUrlParser {
  constructor() {};
  parse(url) {
    const spotifyProvider = new ParsedProviderURL();
    const path = url.pathname;
    spotifyProvider.platform = 'spotify';
    spotifyProvider.language = '';
    spotifyProvider.destination = `/${path.split('/').slice(2).join('/')}`;
    spotifyProvider.shareUrl = url;

    let type = path.split('/')[1];
    if (type === 'track') {
      type = 'song';
    }
    spotifyProvider.type = type;
    return spotifyProvider;
  }
};
