'use strict';
import ParsedProviderURL from '../base/provider-url';

export default class AppleMusicUrlParser {
  constructor() {};
  parse(url) {
    const path = url.pathname;
    const appleProvider = new ParsedProviderURL();
    appleProvider.platform = 'apple';
    appleProvider.language = path.split('/')[1];
    appleProvider.shareUrl = url;

    if (url.searchParams.get('i')) {
      appleProvider.type = 'song';
      appleProvider.destination = url.searchParams.get('i');
    } else {
      appleProvider.type = path.split('/')[2];
      appleProvider.destination = `/${path.split('/').slice(3).join('/')}`;
    }
    return appleProvider;
  }
};
