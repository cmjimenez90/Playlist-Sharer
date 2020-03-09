import axios from 'axios'
import {ShareablePlaylistURL,ShareablePlaylistAuthURL,ShareablePlaylistAPIURL} from 'react-native-dotenv'

export default class ShareablePlaylistClient {
    constructor() {
        this.apiAuthURL = ShareablePlaylistAuthURL;
        this.apiURL = ShareablePlaylistAPIURL;
        const baseURL = ShareablePlaylistURL;
        this.axiosClient = axios.create({
            baseURL: baseURL,
        });
    };

    async convertToSpotify(usertoken, url){
        requestURL = `${this.apiURL}/spotify-music`;
        try {
            const response =  await this.axiosClient.post(requestURL,{
                itemURL: url
            },
            {
                headers: {
                    authroization: `bearer ${usertoken}`,
                }
            });
            return response.data;
        }catch (error) {
            return error;
        }
    }

   async convertToApple(usertoken, url){

    }

    async getAppleMusicURLDetails(url){
        requestURL = `${this.apiURL}/apple-music`;
        try {
            const response = await this.axiosClient.get(`${requestURL}?url=${url}`);
            return response.data; 
        }catch (error) {
            return error;
        } 
    }

    async getSpotifyMusicURLDetails(url){
        requestURL = `${this.apiURL}/spotify-music`;
        try {
            const response = await this.axiosClient.get(`${requestURL}?url=${url}`);
            return response.data; 
        }catch (error) {
            return error;
        } 
    }




}
