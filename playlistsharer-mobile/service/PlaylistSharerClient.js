import { config } from '../app-config';
import Axios from 'axios';

/**Playlist Sharer Client
 * @class 
 * @description Client to make request to the Playlist Sharer Client
 */
class PlaylistSharerClient {
    /**
     * @constructor
     */
    constructor(){
        this.client = Axios.create({
            baseURL: config.API_HOST,
        });
    }

    /** getAppleDevToken
     * @method
     * @description Retrieves an Apple Dev token from the playlist sharer API
     */
    async getAppleDevToken() {
        try{
           const response = await this.client.get(config.APPLE_TOKEN_ENDPOINT);
           return response.data;
        }
        catch(error) {
            return error.data;
        }
    }

    /** getSpotifyAuthURL
     * @method
     * @description Retreives the url to start an auth session against Spotify for the playlist sharer api
     */
    getSpotifyAuthURL() {
        return new URL(config.SPOTIFY_AUTH_ENDPOINT,config.API_HOST);
    }

    async refreshSpotifyAuthToken(refreshToken){
       try{
            const response = await this.client.post(config.SPOTIFY_REFRESH_ENDPOINT,{
                "refresh_token": refreshToken,
            });
            return response.data;

       } catch(error){
            return error.data.message;
       }
    }

    async convertItemToSpotify(spotifyUserToken, url) {
        const authorizationHeader = `Bearer ${spotifyUserToken}`;
        const response = await this.client.post(config.SPOTIFY_CONVERSION_ENDPOINT,
            {
                itemURL: url,
            },
            {
                headers:{
                    authorization: authorizationHeader,
                }
        });
        const result = response.data;
        return result;
    }

    async convertItemToAppleMusic(appleMusicUserToken, url) {
        const authorizationHeader = `Bearer ${appleMusicUserToken}`;
        const response = await this.client.post(config.APPLE_CONVERSION_ENDPOINT,
            {
                itemURL: url,
            },
            {
                headers:{
                    authorization: authorizationHeader,
                }
        });
        const result = response.data;
        return result;
    }
}

export default PlaylistSharerClient
