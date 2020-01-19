const acceptedMusicProviders = {
  'music.apple.com': 'apple_music',
  'open.spotify.com': 'spotify',
};
const PlatformProvider = class {
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
const identify = (urlString) => {
  const url = new URL(urlString);
  const provider = url.host;

  if (acceptedMusicProviders[provider]) {
    const path = url.pathname;
    const validProvider = new PlatformProvider();
    validProvider.platform = acceptedMusicProviders[provider];
    validProvider.language = path.split('/')[1];
    validProvider.type = path.split('/')[2];
    validProvider.destination = path.split('/').slice(3).join('/');
    validProvider.url = url;
    validProvider.known = true;

    return validProvider;
  }
  return new PlatformProvider();
};

export default {
  identify,
};
