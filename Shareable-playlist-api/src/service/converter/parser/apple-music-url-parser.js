'use strict';
import ParsedShareUrl from '../parser/parsed-share-url';

export default class AppleMusicUrlParser {
  constructor() {};
  parse(url) {
    const path = url.pathname;
    const appleProvider = new ParsedShareUrl();
    appleProvider.platform = 'apple';
    appleProvider.language = path.split('/')[1];
    appleProvider.type = path.split('/')[2];
    appleProvider.destination = `/${path.split('/').slice(3).join('/')}`;
    appleProvider.shareUrl = url;
    return appleProvider;
  }
};
