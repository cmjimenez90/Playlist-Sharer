/* eslint-disable max-len */
import SpotifyAuthHandler from '../../src/service/authorization/spotify-authorization-handler';
import SpotifyClient from '../../src/service/provider/spotify/spotify-client';
import SpotifyConverter from '../../src/service/provider/spotify/spotify-converter';
import Album from '../../src/service/provider/types/album';
import Playlist from '../../src/service/provider/types/playlist';
import Song from '../../src/service/provider/types/song';

describe('spotify-converter', ()=>{
  it('can convert a song', async ()=> {
    const spotifyAuthHandler = new SpotifyAuthHandler();
    const authToken = await spotifyAuthHandler.asyncGenerateClientCredential();
    const spotifyClient = new SpotifyClient(authToken.access_token);

    const expectedConvertedSong = new Song('So Fresh, So Clean', 'OutKast', 'Stankonia', 'https://open.spotify.com/track/6glsMWIMIxQ4BedzLqGVi4');
    const song = new Song('So Fresh, So Clean', 'OutKast', 'Stankonia');


    const converter = new SpotifyConverter(spotifyClient);
    const convertedSong = await converter.asyncConvertSong(song);
    expect(convertedSong).not.toBeNull();
    expect(convertedSong).toMatchObject(expectedConvertedSong);
  });

  it('can convert an album', async () => {
    const spotifyAuthHandler = new SpotifyAuthHandler();
    const authToken = await spotifyAuthHandler.asyncGenerateClientCredential();
    const spotifyClient = new SpotifyClient(authToken.access_token);
    const expectedConvertedAlbum = new Album(
        'Stankonia',
        'OutKast',
        'https://open.spotify.com/album/2tm3Ht61kqqRZtIYsBjxEj',
    );

    const album = new Album('Stankonia', 'OutKast');
    const converter = new SpotifyConverter(spotifyClient);
    const convertedAlbum = await converter.asyncConvertAlbum(album);
    expect(convertedAlbum).not.toBeNull();
    expect(convertedAlbum).toMatchObject(expectedConvertedAlbum);
  });

  it('can convert a playlist', async () => {
    const spotifyAuthHandler = new SpotifyAuthHandler();
    const authToken = await spotifyAuthHandler.asyncGenerateClientCredential();
    const spotifyClient = new SpotifyClient(authToken.access_token);

    const playlist = new Playlist('Custom Playlist');
    const songs = [
      new Song('Didn\'t I', 'OneRepublic', 'Human (Delux)'),
      new Song('Rescue Me', 'OneRepublic', 'Human (Delux)'),
      new Song('Bad Child', 'Tones and I', ''),
    ];

    playlist.songs = songs;
    const converter = new SpotifyConverter(spotifyClient);
    const convertedPlaylist = await converter.asyncConvertPlaylist(playlist);

    expect(convertedPlaylist).not.toBeNull();
    expect(convertedPlaylist.songs.length).toBe(3);
    convertedPlaylist.songs.forEach((song, index) => {
      expect(song.name).toBe(songs[index].name);
    });
  });
});
