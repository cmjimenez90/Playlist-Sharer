import axios from 'axios';

export default class AppleMusicClient {
  constructor(developerToken) {
    this.axiosClient = axios.create({
      baseURL: 'https://api.music.apple.com',
      headers: {
        Authorization: `Bearer ${developerToken}`,
      },
    });
  }

  async asyncGetSong(songID, storefront='us') {
    const songURL = `/v1/catalog/${storefront}/songs/${songID}`;
    try {
      const response = await this.axiosClient.get(songURL);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async asyncGetAlbum(albumID, storefront='us') {
    const albumURL = `/v1/catalog/${storefront}/albums/${albumID}`;
    try {
      const response = await this.axiosClient.get(albumURL);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async asyncGetPlaylist(playlistID, storefront='us') {
    const playlistURL = `/v1/catalog/${storefront}/playlists/${playlistID}`;
    try {
      const response = await this.axiosClient.get(playlistURL);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  async asyncSearch(itemTypes, term, storefront='us', limit = 100) {
    const searchURL = `/v1/catalog/${storefront}/search`;
    const types = itemTypes.reduce((prev, current)=>{
      return `${prev},${current}`;
    });
    const constructedQuery = encodeURI(`?term=${term}&limit=${limit}&types=${types}`);
    try {
      const response = await this.axiosClient.get(`${searchURL}${constructedQuery}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
