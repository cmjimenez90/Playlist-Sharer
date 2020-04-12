'use strict';

/**
 * @class
 * @classdesc Playlist data object
 */
export default class Playlist {
  constructor(playlistName, songs = []) {
    this.name =playlistName;
    this.songs = songs;
  }
};
