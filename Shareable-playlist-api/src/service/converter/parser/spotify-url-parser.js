'use strict';
import ParsedProviderURL from './parsed-provider-url';

export default class SpotifyUrlParser {
  constructor() {};
  parse(url) {
    const spotifyProvider = new ParsedProviderURL();
    const path = url.pathname;
    spotifyProvider.platform = 'spotify';
    spotifyProvider.type = path.split('/')[1];
    spotifyProvider.language = '';
    spotifyProvider.destination = `/${path.split('/').slice(2).join('/')}`;
    spotifyProvider.shareUrl = url;
    return spotifyProvider;
  }
};
