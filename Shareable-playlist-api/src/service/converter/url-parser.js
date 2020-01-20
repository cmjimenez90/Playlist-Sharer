'use strict';

const acceptedMusicProviders = {
  'music.apple.com': parseAppleMusicUrl,
  'open.spotify.com': parseSpotifyMusicUrl,
};

const ParsedMusicProvider = class {
  constructor(platform,
      language,
      type,
      destination,
      url) {
    this.platform = platform;
    this.language = language;
    this.type = type;
    this.destination = destination;
    this.url = url;
  }
};

function parseAppleMusicUrl(url) {
  const path = url.pathname;
  const parsedMusicProvider = new ParsedMusicProvider();
  parsedMusicProvider.platform = 'apple';
  parsedMusicProvider.language = path.split('/')[1];
  parsedMusicProvider.type = path.split('/')[2];
  parsedMusicProvider.destination = `/${path.split('/').slice(3).join('/')}`;
  parsedMusicProvider.url = url;
  parsedMusicProvider.known = true;
  return parsedMusicProvider;
};

function parseSpotifyMusicUrl(url) {
  const path = url.pathname;
  const parsedMusicProvider = new ParsedMusicProvider();
  parsedMusicProvider.platform = 'spotify';
  parsedMusicProvider.type = path.split('/')[1];
  parsedMusicProvider.language = 'unknown';
  parsedMusicProvider.destination = `/${path.split('/').slice(2).join('/')}`;
  parsedMusicProvider.url = url;
  parsedMusicProvider.known = true;
  return parsedMusicProvider;
};


function identify(urlString) {
  const url = new URL(urlString);
  const provider = url.host;
  if (acceptedMusicProviders[provider]) {
    const urlParser = acceptedMusicProviders[provider];
    return urlParser(url);
  }
  return null;
};

export default {
  identify,
};
