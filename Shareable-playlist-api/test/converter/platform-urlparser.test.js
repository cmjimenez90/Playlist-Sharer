/* eslint-disable max-len */
import urlParser from '../../src/service/converter/platform-urlparser';

describe('sharedurl-parser', () => {
  describe('Understood link types', () => {
    it('Can identity Apple Music links', () => {
      const APPLE_MUSIC_GENROOTURL = 'https://music.apple.com/';
      const expectedProvider = {
        platform: 'apple_music',
        language: '',
        type: '',
        destination: '',
        url: '',
        known: true,
      };

      let testUrl = `${APPLE_MUSIC_GENROOTURL}us/album/revenge-of-the-dreamers-iii-directors-cut/1494857069`;

      let platformProvider = urlParser.identify(testUrl);
      expectedProvider.language = 'us';
      expectedProvider.type = 'album';
      expectedProvider.destination = 'revenge-of-the-dreamers-iii-directors-cut/1494857069';
      expectedProvider.url = new URL(testUrl);

      expect(platformProvider.known).toBe(true);
      expect(platformProvider).toMatchObject(expectedProvider);

      testUrl = `${APPLE_MUSIC_GENROOTURL}us/playlist/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5`;

      platformProvider = urlParser.identify(testUrl);
      expectedProvider.language = 'us';
      expectedProvider.type = 'playlist';
      expectedProvider.destination = 'rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5';
      expectedProvider.url = new URL(testUrl);

      expect(platformProvider.known).toBe(true);
      expect(platformProvider).toMatchObject(expectedProvider);
    });
    it('Can identity Spotify Music links', () => {});
  });
  describe('Unknown link types', () => {
    it('Returns an error object', () => {
      const UNKNOWN_URL = 'https://pandora.com/';

      const testUrl = `${UNKNOWN_URL}us/album/revenge-of-the-dreamers-iii-directors-cut/1494857069`;

      const platformProvider = urlParser.identify(testUrl);

      expect(platformProvider.known).toBe(false);
    });
  });
});
