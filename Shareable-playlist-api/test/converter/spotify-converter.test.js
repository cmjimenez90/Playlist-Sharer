/* eslint-disable max-len */
import axios from 'axios';
import SpotifyConverter from '../../src/service/converter/spotify-converter';
import Song from '../../src/service/converter/entity-types/song';
import Album from '../../src/service/converter/entity-types/album';
import Playlist from '../../src/service/converter/entity-types/playlist';

jest.mock('axios');

describe('spotify-converter', ()=>{
  it('can convert a song', async ()=> {
    const expectedConvertedSong = new Song('So Fresh, So Clean', 'OutKast', 'Stankonia', 'https://open.spotify.com/track/6glsMWIMIxQ4BedzLqGVi4');
    const FAKE_RESPONSE = {
      status: 200,
      data: {
        tracks: {
          items: [{
            external_urls: {
              spotify: expectedConvertedSong.url,
            },
          }],
        },
      },
    };
    const accessToken = 'FAKE_TOKEN';
    const song = new Song('So Fresh, So Clean', 'OutKast', 'Stankonia');
    const converter = new SpotifyConverter(accessToken);
    axios.get.mockResolvedValue(FAKE_RESPONSE);
    const convertedSong = await converter.asyncConvertSong(song);
    expect(convertedSong).not.toBeNull();
    expect(convertedSong).toMatchObject(expectedConvertedSong);
  });

  it('can convert an album', async () => {
    const expectedConvertedAlbum = new Album(
        'Stankonia',
        'OutKast',
        'https://open.spotify.com/album/2tm3Ht61kqqRZtIYsBjxEj',
    );
    const FAKE_RESPONSE = {
      status: 200,
      data: {
        albums: {
          items: [{
            external_urls: {
              spotify: expectedConvertedAlbum.url,
            },
          }],
        },
      },
    };
    const accessToken = 'FAKE_TOKEN';
    const album = new Album('Stankonia', 'OutKast');
    const converter = new SpotifyConverter(accessToken);
    axios.get.mockResolvedValue(FAKE_RESPONSE);
    const convertedAlbum = await converter.asyncConvertAlbum(album);
    expect(convertedAlbum).not.toBeNull();
    expect(convertedAlbum).toMatchObject(expectedConvertedAlbum);
  });

  it('can convert a playlist', async () => {
    const FAKE_SONGS = [
      new Song('TEST SONG 1', 'TEST ARTIST 1', 'MY FIRST ALBUM', 'https://open.spotify.com/track/6glsMWIMIxQ4BedzLFDVi1'),
      new Song('TEST SONG 2', 'TEST ARTIST 2', 'MY SECOND ALBUM', 'https://open.spotify.com/track/6glsMWIMIxQ4BedzASZVi2'),
      new Song('TEST SONG 1', 'TEST ARTIST 3', 'MY THIRD ALBUM', 'https://open.spotify.com/track/7VlsMWIMIxQ4BedzLFDVi3'),
    ];

    axios.get
        .mockImplementationOnce(()=>{
          return {
            status: 200,
            data: {
              tracks: {
                items: [{
                  external_urls: {
                    spotify: FAKE_SONGS[0].url,
                  },
                }],
              },
            }};
        })
        .mockImplementationOnce(()=>{
          return {
            status: 200,
            data: {
              tracks: {
                items: [{
                  external_urls: {
                    spotify: FAKE_SONGS[1].url,
                  },
                }],
              },
            }};
        })
        .mockImplementationOnce(()=>{
          return {
            status: 200,
            data: {
              tracks: {
                items: [{
                  external_urls: {
                    spotify: FAKE_SONGS[2].url,
                  },
                }],
              },
            }};
        });

    const playlist = new Playlist('TEST PLAYLIST', [
      new Song(FAKE_SONGS[0].name, FAKE_SONGS[0].artist, FAKE_SONGS[0].releaseAlbum),
      new Song(FAKE_SONGS[1].name, FAKE_SONGS[1].artist, FAKE_SONGS[1].releaseAlbum),
      new Song(FAKE_SONGS[2].name, FAKE_SONGS[2].artist, FAKE_SONGS[2].releaseAlbum)]);
    const accessToken = 'FAKE_TOKEN';
    const converter = new SpotifyConverter(accessToken);
    const convertedPlaylist = await converter.asyncConvertPlaylist(playlist);

    expect(convertedPlaylist).not.toBeNull();
    expect(convertedPlaylist.songs.length).toBe(3);
    convertedPlaylist.songs.forEach((song, index) => {
      expect(song).toMatchObject(FAKE_SONGS[index]);
    });
  });
});
