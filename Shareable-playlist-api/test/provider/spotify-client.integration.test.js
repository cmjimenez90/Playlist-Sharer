import SpotifyClient from '../../src/service/provider/spotify/spotify-client';
import SpotifyAuthorizationHandler from '../../src/service/authorization/spotify-authorization-handler';
// this entire test needs to be redone but works to test dependencies with working client
it('does all the following', async ()=> {
  const authorizationHandler = new SpotifyAuthorizationHandler();
  const clientToken = await authorizationHandler.asyncGenerateClientCredential();
  expect(clientToken).not.toBeNull();

  const client = new SpotifyClient(clientToken.access_token);

  // In Arms song
  const song = await client.getSong('0mqDNdnkSOTKqsUIsAEfW2');
  expect(song.name).toBe('In Arms');

  // Brothers album by Black Eyed Peas
  const album = await client.getAlbum('7qE6RXYyz5kj5Tll7mJU0v');
  expect(album.name).toBe('Brothers');

  // Housewerk Playlist
  const playlist = await client.getPlaylist('37i9dQZF1DXa8NOEUWPn9W');
  expect(playlist.name).toBe('Housewerk');

  // Search for a song
  const searchedSong = await client.search(['track'], 'ooh I love it artist:The Salsoul Orchestra');
  expect(searchedSong.tracks.items).not.toBeNull();

  // Create a playlist and adds songs.. needs user token to work successfully
  // const userToken = '';
  // const userDetails = await client.getUserDetails(userToken);
  // const newPlaylist = await client.createPlaylist(userToken, userDetails.id, 'test-playlist');
  // const songIDs = ['4KyEeZwIuoFH0n68qvl35b', '3hq2vQXYuiF5FVoCQZJbac', '0F7I2jEvpQnLpiiS0wbCpO'];
  // const successfullyAddedSongs = await client.addSongsToPlaylist(userToken, newPlaylist.id, songIDs);
  // expect(successfullyAddedSongs).toBeTruthy();
});
