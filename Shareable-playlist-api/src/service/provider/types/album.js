'use strict';

/**
 * @class
 * @classdesc Album data object
 */
export default class Album {
  constructor(albumName, artist, url='') {
    this.name = albumName;
    this.artist = artist;
    this.url = url;
  }
};
