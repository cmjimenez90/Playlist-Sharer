'use strict';
import ConversionHandler from '../../src/service/provider/conversion-handler';
import SpotifyClient from '../../src/service/provider/spotify/spotify-client';
import AppleClient from '../../src/service/provider/apple/apple-music-client';

jest.mock('../../src/service/provider/spotify/spotify-client');
jest.mock('../../src/service/provider/apple/apple-music-client');

describe('ConversionHandler', ()=>{
  describe('converting a url to apple music', ()=>{
    it('returns no url if it failed to convert the supplied item', () => {
      const spotifyClient = new SpotifyClient('');
      const appleClient = new AppleClient('');

      appleClient.asyncGetSong.mockResolvedValue({
        name: 'Some Song',
      });
      const handler = new ConversionHandler(spotifyClient, appleClient);
    });
  });
});
