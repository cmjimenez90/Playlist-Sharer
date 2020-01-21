/* eslint-disable max-len */
import ParsedShareUrl from '../../../src/service/converter/parser/parsed-share-url';
import AppleMusicUrlParser from '../../../src/service/converter/parser/apple-music-url-parser';

describe('apple-music-url-parser', () => {
  it('can parse albums', () =>{
    const urlParser = new AppleMusicUrlParser();
    const appleUrl = new URL('https://music.apple.com/us/album/revenge-of-the-dreamers-iii-directors-cut/1494857069');
    const parsedUrl = urlParser.parse(appleUrl);

    const expectedMusicProvider = new ParsedShareUrl(
        'apple', 'us', 'album', '/revenge-of-the-dreamers-iii-directors-cut/1494857069', appleUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
  it('can parse songs', () =>{
    const urlParser = new AppleMusicUrlParser();
    const appleUrl = new URL('https://music.apple.com/us/song/anothersong/1494857069');
    const parsedUrl = urlParser.parse(appleUrl);

    const expectedMusicProvider = new ParsedShareUrl(
        'apple', 'us', 'song', '/anothersong/1494857069', appleUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
  it('can parse playlist', () =>{
    const urlParser = new AppleMusicUrlParser();
    const appleUrl = new URL('https://music.apple.com/us/playlist/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5?app=music&ign-itsct=330&ign-itscg=10000');
    const parsedUrl = urlParser.parse(appleUrl);

    const expectedMusicProvider = new ParsedShareUrl(
        'apple', 'us', 'playlist', '/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5', appleUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
});
