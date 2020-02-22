import AppleMusicClient from '../../src/service/provider/apple/apple-music-client';
import AppleMusicConverter from '../../src/service/provider/apple/apple-music-converter';
import Song from '../../src/service/provider/types/song';

jest.mock('../../src/service/provider/apple/apple-music-client');

describe('AppleMusicConverter', () => {
  beforeEach(()=> {
    AppleMusicClient.mockClear();
  });
  it('can convert a song', async ()=> {

  });

  it('can convert an album', async () => {
   

  it('can convert a playlist', async () => {
   
  });
});
