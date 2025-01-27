'use strict';

/**
   * @class
   * @classdesc Creates ProviderUrl to represent Music Streaming URL
   */
export default class ProviderUrl {
  constructor(platform, language, type, destination, url) {
    this.platform = platform;
    this.language = language;
    this.type = type;
    this.destination = destination;
    this.url = url;
  }
};
