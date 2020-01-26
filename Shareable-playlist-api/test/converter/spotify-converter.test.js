/* eslint-disable max-len */
import axios from 'axios';
import SpotifyConverter from '../../src/service/converter/spotify-converter';
import Song from '../../src/service/converter/entity-types/song';
import Album from '../../src/service/converter/entity-types/album';
import playlist from '../../src/service/converter/entity-types/playlist';

jest.mock('axios');

describe('spotify-converter', ()=>{
  it('can convert a song', async ()=> {
    const expectedURL = 'https://open.spotify.com/track/6glsMWIMIxQ4BedzLqGVi4';
    const FAKE_RESPONSE = {
      status: 200,
      data: {
        tracks: {
          items: [{
            external_urls: {
              spotify: expectedURL,
            },
          }],
        },
      },
    };
    const accessToken = 'FAKE_ACCESS_TOKEN';
    const song = new Song('So Fresh, So Clean', 'OutKast', 'Stankonia');
    const converter = new SpotifyConverter(accessToken);
    axios.get.mockResolvedValue(FAKE_RESPONSE);
    const url = await converter.convertSong(song);
    expect(url).not.toBeNull();
    expect(url).toBe(expectedURL);
  });
});
