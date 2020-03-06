'use strict';
import ValidProviders from './valid-providers';

const validProviders = new ValidProviders();

const acceptedMusicProviders = validProviders.providers; ;
function identify(urlString) {
  const url = new URL(urlString);
  const rootUrl = url.host;
  if (acceptedMusicProviders.has(rootUrl)) {
    const provider = acceptedMusicProviders.get(rootUrl);
    return provider.parse(url);
  }
  return null;
};

export default {
  identify,
};
