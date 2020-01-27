'use strict';

export default class Playlist {
  constructor(playlistName, songs = []) {
    this.name =playlistName;
    this.songs = songs;
  }
};
