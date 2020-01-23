'use strict';
import AppleMusicProvider from '../providers/apple-music-provider';
import SpotifyMusicProvider from '../providers/spotify-music-provider';

const appleMusicProvider = new AppleMusicProvider();
const spotifyMusicProvider = new SpotifyMusicProvider();
const acceptedMusicProviders = {
  'music.apple.com': appleMusicProvider,
  'open.spotify.com': spotifyMusicProvider,
};

function identify(urlString) {
  const url = new URL(urlString);
  const rootUrl = url.host;
  if (acceptedMusicProviders[rootUrl]) {
    const provider = acceptedMusicProviders[rootUrl];
    console.log(provider);
    return provider.parse(url);
  }
  return null;
};

export default {
  identify,
};
