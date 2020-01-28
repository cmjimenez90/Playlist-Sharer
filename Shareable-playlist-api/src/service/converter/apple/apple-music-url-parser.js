'use strict';
import ParsedProviderURL from '../base/parsed-provider-url';

export default class AppleMusicUrlParser {
  constructor() {};
  parse(url) {
    const path = url.pathname;
    const appleProvider = new ParsedProviderURL();
    appleProvider.platform = 'apple';
    appleProvider.language = path.split('/')[1];
    appleProvider.type = path.split('/')[2];
    appleProvider.destination = `/${path.split('/').slice(3).join('/')}`;
    appleProvider.shareUrl = url;
    return appleProvider;
  }
};
