/* eslint-disable max-len */
import ParsedProviderURL from '../../src/service/provider/base/provider-url';
import SpotifyUrlParser from '../../src/service/provider/spotify/spotify-url-parser';

describe('spotify-url-parser', () => {
  it('can parse album url', () => {
    const urlParser = new SpotifyUrlParser();
    const spotifyAlbumUrl = new URL('https://open.spotify.com/album/37i9dQZF1DWXRqgorJj26U');
    const parsedUrl = urlParser.parse(spotifyAlbumUrl);

    const expectedMusicProvider = new ParsedProviderURL(
        'spotify', '', 'album', '/37i9dQZF1DWXRqgorJj26U', spotifyAlbumUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
  it('can parse song url', () => {
    const urlParser = new SpotifyUrlParser();
    const spotifySongUrl = new URL('https://open.spotify.com/song/37i9dQZF1DWXRqgorJj26U');
    const parsedUrl = urlParser.parse(spotifySongUrl);

    const expectedMusicProvider = new ParsedProviderURL(
        'spotify', '', 'song', '/37i9dQZF1DWXRqgorJj26U', spotifySongUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
  it('can parse playlist url', () => {
    const urlParser = new SpotifyUrlParser();
    const spotifyPlaylistUrl = new URL('https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U');
    const parsedUrl = urlParser.parse(spotifyPlaylistUrl);

    const expectedMusicProvider = new ParsedProviderURL(
        'spotify', '', 'playlist', '/37i9dQZF1DWXRqgorJj26U', spotifyPlaylistUrl,
    );

    expect(parsedUrl).not.toBeNull();
    expect(parsedUrl).toMatchObject(expectedMusicProvider);
  });
});
