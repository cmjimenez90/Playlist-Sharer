import { AsyncStorage, useContext } from 'react-native';
import {AuthenticationContext} from './AuthenticationContext'
import AppNavigator from '../screens/AppNavigator';

export default class AuthenticationStorage {
    constructor(){
        this.SPOTIFY_TOKEN = '@Spotify_Token';
        this.SPOTIFY_REFRESH = '@Spotify_Refresh';
        this.SPOTIFY_EXPIRATION = '@Spotify_Expiration';
        this.APPLE_MUSIC_USER_TOKEN = '@Apple_Music_User_Token';
    }
    

    async asyncLoadAuthenticationFromStore(){
        try{
            const spotifyToken = await AsyncStorage.getItem(this.SPOTIFY_TOKEN);
            const spotifyExpiration = await AsyncStorage.getItem(this.SPOTIFY_EXPIRATION);
            const spotifyRefresh = await AsyncStorage.getItem(this.SPOTIFY_REFRESH);
            const appleMusicUserToken = await AsyncStorage.getItem(this.APPLE_MUSIC_USER_TOKEN);

            const Spotify = {
                'isAuthorized': false,
                'access_token': '',
                'refresh_token': '',
                'expires_in': '',
            }

            const Apple = {
                'isAuthorized': false,
                'apple_music_user_token': '',
            }

            if(spotifyToken !== null && spotifyExpiration !== null && spotifyRefresh !== null){
                Spotify.isAuthorized = true;
                Spotify.access_token = spotifyToken;
                Spotify.refresh_token = spotifyRefresh;
                Spotify.expires_in = spotifyExpiration;
            }        
            
            if(appleMusicUserToken !== null) {
                Apple.isAuthorized = true;
                Apple.apple_music_user_token = appleMusicUserToken;
            }

            return {
                spotify_authorization: Spotify,
                apple_authorization: Apple,
            };
        }catch(error){
            console.log(error.message);
            return null;
        }
        
    };

    async asyncClearSpotifyFromStore(){
        try{
            await AsyncStorage.removeItem(this.SPOTIFY_TOKEN);
            await AsyncStorage.removeItem(this.SPOTIFY_EXPIRATION);
            await AsyncStorage.removeItem(this.SPOTIFY_REFRESH);
            return true;
        }catch(error){
            console.log(error.message);
            return false;
        }      
    }
    async asyncClearAppleFromStore(){
        try{
            await AsyncStorage.removeItem(this.APPLE_MUSIC_USER_TOKEN); 
            return true;
        }catch(error){
            console.log(error.message);
            return false;
        } 
    }

    async asyncSaveItemToStore(key,value){
        try{
            await AsyncStorage.setItem(key,value);
            console.log('saved');
        } catch (error){
            console.log(error.message);
            return false;
        }
    };
}