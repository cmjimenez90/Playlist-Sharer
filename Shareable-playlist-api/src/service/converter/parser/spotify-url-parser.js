'use strict';
import ParsedShareUrl from '../parser/parsed-share-url';

export default class SpotifyUrlParser {
  constructor() {};
  parse(url) {
    const spotifyProvider = new ParsedShareUrl();
    const path = url.pathname;
    spotifyProvider.platform = 'spotify';
    spotifyProvider.type = path.split('/')[1];
    spotifyProvider.language = '';
    spotifyProvider.destination = `/${path.split('/').slice(2).join('/')}`;
    spotifyProvider.shareUrl = url;
    return spotifyProvider;
  }
};
