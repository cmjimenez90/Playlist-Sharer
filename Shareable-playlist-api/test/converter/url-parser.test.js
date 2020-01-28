/* eslint-disable max-len */
import urlIdentifier from '../../src/service/converter/url-identifier';

describe('url-parser', () => {
  it('Can identity Apple Music links', () => {
    const appleUrl = 'https://music.apple.com/us/album/revenge-of-the-dreamers-iii-directors-cut/1494857069';
    const expectedPlatformType = 'apple';

    const platformProvider = urlIdentifier.identify(appleUrl);

    expect(platformProvider.platform).toBe(expectedPlatformType);
  });
  it('Can identity Spotify Music links', () => {
    const spotifyUrl = 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U';
    const expectedPlatformType = 'spotify';

    const platformProvider = urlIdentifier.identify(spotifyUrl);

    expect(platformProvider.platform).toBe(expectedPlatformType);
  });
});
describe('Unknown link types', () => {
  it('Returns an error object', () => {
    const unknownUrl = 'https://pandora.com/us/album/revenge-of-the-dreamers-iii-directors-cut/1494857069';

    const platformProvider = urlIdentifier.identify(unknownUrl);

    expect(platformProvider).toBeNull();
  });
});
