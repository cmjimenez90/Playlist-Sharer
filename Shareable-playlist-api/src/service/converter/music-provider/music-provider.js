'use strict';

export default class MusicProvider {
  constructor(platform, language, type, destination, shareUrl) {
    this.platform = platform;
    this.language = language;
    this.type = type;
    this.destination = destination;
    this.shareUrl = shareUrl;
  }
};
