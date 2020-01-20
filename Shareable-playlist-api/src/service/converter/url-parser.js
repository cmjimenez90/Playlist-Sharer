const acceptedMusicProviders = {
  'music.apple.com': parseAppleMusicUrl,
  'open.spotify.com': parseSpotifyMusicUrl,
};

const MusicProvider = class {
  constructor(platform,
      language,
      type,
      destination,
      url,
      known = false) {
    this.platform = platform;
    this.language = language;
    this.type = type;
    this.destination = destination;
    this.url = url;
    this.known = known;
  }
};

function parseAppleMusicUrl(url) {
  const path = url.pathname;
  const musicProvider = new MusicProvider();
  musicProvider.platform = 'apple_music';
  musicProvider.language = path.split('/')[1];
  musicProvider.type = path.split('/')[2];
  musicProvider.destination = `/${path.split('/').slice(3).join('/')}`;
  musicProvider.url = url;
  musicProvider.known = true;
  return musicProvider;
};

function parseSpotifyMusicUrl() { };

const identify = (urlString) => {
  const url = new URL(urlString);
  const provider = url.host;
  if (acceptedMusicProviders[provider]) {
    const urlParser = acceptedMusicProviders[provider];
    return urlParser(url);
  }
  return new MusicProvider();
};

export default {
  identify,
};
