'use strict';

export default class Song {
  constructor(songName, artist, releaseAlbum, url ='') {
    this.name = songName;
    this.artist = artist;
    this.releaseAlbum = releaseAlbum;
    this.url = url;
  }
};
