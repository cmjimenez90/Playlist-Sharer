'use strict';
import MusicProvider from '../music-provider/music-provider';

export default class AppleMusicUrlParser {
  constructor() {};
  parse(url) {
    const path = url.pathname;
    const appleProvider = new MusicProvider();
    appleProvider.platform = 'apple';
    appleProvider.language = path.split('/')[1];
    appleProvider.type = path.split('/')[2];
    appleProvider.destination = `/${path.split('/').slice(3).join('/')}`;
    appleProvider.shareUrl = url;
    return appleProvider;
  }
};
