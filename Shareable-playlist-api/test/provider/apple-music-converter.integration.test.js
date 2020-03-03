import AppleMusicClient from '../../src/service/provider/apple/apple-music-client';
import AppleMusicConverter from '../../src/service/provider/apple/apple-music-converter';
import Song from '../../src/service/provider/types/song';
import Album from '../../src/service/provider/types/album';
import AppleAuthorizationHandler from '../../src/service/authorization/apple-authorization-handler';

describe('AppleMusicConverter', () => {
  it('really really works', async () => {
    const appleAuthHandler = new AppleAuthorizationHandler();
    const appleMusicClient = new AppleMusicClient(await appleAuthHandler.asyncGenerateDeveloperToken());

    const converter = new AppleMusicConverter(appleMusicClient);
    let song = new Song('Holy Water', 'Galantis', 'Church');
    let convertedSong = await converter.asyncConvertSong(song);
    expect(convertedSong.url).toBe('https://music.apple.com/us/album/holy-water/1496875801?i=1496875866');

    song = new Song('Crash Into Me', 'Dave Matthews', 'Crash');
    convertedSong = await converter.asyncConvertSong(song);
    expect(convertedSong.url).toBe('https://music.apple.com/us/album/crash-into-me/388136111?i=388136331');

    const album = new Album('Lover', 'Taylor Swift');
    const convertedAlbum = await converter.asyncConvertAlbum(album);
    expect(convertedAlbum.url).toBe('https://music.apple.com/us/album/lover/1468058165');
  });
});
