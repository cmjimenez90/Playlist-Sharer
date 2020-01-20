'use strict';
import SpotifyParser from '../parser/spotify-url-parser';
import AppleParser from '../parser/apple-music-url-parser';


const acceptedMusicProviders = {
  'music.apple.com': new AppleParser(),
  'open.spotify.com': new SpotifyParser(),
};

function identify(urlString) {
  const url = new URL(urlString);
  const provider = url.host;
  if (acceptedMusicProviders[provider]) {
    const urlParser = acceptedMusicProviders[provider];
    return urlParser.parse(url);
  }
  return null;
};

export default {
  identify,
};
