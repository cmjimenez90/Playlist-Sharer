# Playlist Sharer

## Author: Carlos M Jimenez
## Version 1.0.0

API Service for Sharing Playlist Accross Streaming Platforms

How great would it be to be able to share your playlist with any of your friends. Now you can. Whether your an Apple Music user or Spotify, now you can just past in the shared URL and let Playlist Sharer take care of the rest.

### Understanding the codebase

Playlist Sharer is built upon two projects. The main project (Shareable-playlist-api) is the API service that handles the conversion of URLs from Spotify and Apple Music. The api can also be used to return the information about a specifc url from Spotify or Apple Music.

The second portion of the project is the Playlist Sharer mobile application (ShareablePlaylist-Mobile-Application). This mobile application is an MVP at the moment. It's purpose is to demonstrate the API ability to convert Spotify and Apple Music urls for the end-user. The mobile application is currently only functional in IOS based devices. Supporting Apple Music authorization in Android based devices is still to supported at a later time.


### Running the Playlist Sharer API

The Playlist Sharer API is built with docker support and can be easily run in a docker container. There are a few requirements before the API can be successfully run.

You must provide the following for the API to function:
* Spotify_REDIRECT_URI (The registered callback url for Spotify Music)
* SPOTIFY_CLIENTID (Client ID provided from registered Spotify Music developer account)
* SPOTIFY_SECRET (Secret token provided from registered Spotify Music developer account)
* APPLEMUSIC_TEAMID (TeamID from registered Apple Developer account)
* APPLEMUSIC_KID (KID from registered Apple Developer account)
* APPLEMUSIC_SECRET (Directory where the Apple Developer private key is stored. This is used to sign the Apple Music developer JWT tokens.)

The listed items can be provided via environment variables when utilizing the docker deployment method.

1. First build the image as follows:
```bash 
sudo docker build -t playlistapi .
```

2. run the image.
```bash
sudo docker run  -v /home/administrator/keys:/usr/app/keys -p 80:80 -e SERVER_PORT="80" -e SPOTIFY_REDIRECT_URI="http://10.0.0.45/authorize/spotify/callback" -e SPOTIFY_CLIENTID="123456789087654321" -e SPOTIFY_SECRET="987654321" -e APPLEMUSIC_TEAMID="ABCDEFGH" -e APPLEMUSIC_KID="ABCDEFGH" -e APPLEMUSIC_SECRET="/usr/app/keys/appleMusicKit_Secret.p8" -dit --rm --name api playlistapi
```