import AppleMusicClient from '../../src/service/provider/apple/apple-music-client';
import AppleMusicConverter from '../../src/service/provider/apple/apple-music-converter';
import Song from '../../src/service/provider/types/song';
import Album from '../../src/service/provider/types/album';

jest.mock('../../src/service/provider/apple/apple-music-client');


describe('AppleMusicConverter', () => {
  beforeAll(() => {
    AppleMusicClient.mockImplementation(() => {
      return {
        asyncSearch: (itemTypes, term) => {
          return {
            results: {
              songs: {
                href: '/v1/catalog/us/search?limit=1&term=monster&types=songs',
                next: '/v1/catalog/us/search?offset=1&term=monster&types=songs',
                data: [{id: '1234567', attributes: {
                  name: 'SONG NAME',
                  artistName: 'ARTIST NAME',
                  albumName: 'ALBUM NAME',
                  url: 'ARBITRARY URL',
                }}],
              },
            },
          };
        },
      };
    });
  });

  it('can convert a song', async ()=> {
    const converter = new AppleMusicConverter(new AppleMusicClient());
    const song = await converter.asyncConvertSong(new Song('SONG NAME', 'ARTIST NAME', 'ALBUM NAME'));
    expect(song.name).toBe('SONG NAME');
    expect(song.artist).toBe('ARTIST NAME');
    expect(song.releaseAlbum).toBe('ALBUM NAME');
  });

  it('can convert an album', async () => {
    const converter = new AppleMusicConverter(AppleMusicClient);
    const ablum = await converter.asyncConvertSong(new Album('ALBUM NAME', 'ARTIST NAME'));
    expect(ablum.artist).toBe('ARITST NAME');
    expect(ablum.ablumName).toBe('ABLUM NAME');
  });


  it('can convert a playlist', async () => {

  });
});
