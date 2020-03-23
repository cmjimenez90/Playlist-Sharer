import AppleClient from '../../../src/service/provider/apple/apple-music-client';
import AppleAuthorizationHandler from '../../../src/service/authorization/apple-authorization-handler';
// this entire test needs to be redone but works to test dependencies with working client
it('does all the following', async ()=> {
  const authorizationHandler = new AppleAuthorizationHandler();
  const clientToken = authorizationHandler.generateDeveloperToken();
  expect(clientToken).not.toBeNull();

  const appleClient = new AppleClient(clientToken);

  const song = await appleClient.asyncGetSong('203709340');
  expect(song[0]).not.toBeNull();
  expect(song[0].attributes.albumName).toBe('Born In the U.S.A.');
  expect(song[0].attributes.name).toBe('Dancing In the Dark');

  const album = await appleClient.asyncGetAlbum('203708420');
  expect(album[0]).not.toBeNull();
  expect(album[0].attributes.name).toBe('Born In the U.S.A.');

  const playlist = await appleClient.asyncGetPlaylist('pl.f4d106fed2bd41149aaacabb233eb5eb');
  expect(playlist[0]).not.toBeNull();
  expect(playlist[0].attributes.name).toMatch(/Today*/);

  const response = await appleClient.asyncSearch(['songs'], 'monster', 'us', 1);
  expect(response.results.songs.data[0].id).toBe('1440742912');
});
