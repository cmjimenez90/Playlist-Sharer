import SpotifyClient from '../../src/service/provider/spotify/spotify-client';
import SpotifyAuthorizationHandler from '../../src/service/authorization/spotify-authorization-handler';
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

  // Create a playlist
  const userDetails = await client.getUserDetails('');
  expect(userDetails.display_name).toBe('River');
});
