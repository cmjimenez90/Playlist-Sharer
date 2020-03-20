import { AsyncStorage } from 'react-native';

export default class AuthenticationStorage {
    
    constructor(){
        this.SPOTIFY_TOKEN = '@Spotify_Token';
        this.SPOTIFY_REFRESH = '@Spotify_Refresh';
        this.SPOTIFY_EXPIRATION = '@Spotify_Expiration';
    }
    

    async asyncLoadAuthenticationFromStore(){
        try{
            const spotifyToken = await AsyncStorage.getItem(this.SPOTIFY_TOKEN);
            const spotifyExpiration = await AsyncStorage.getItem(this.SPOTIFY_EXPIRATION);
            const spotifyRefresh = await AsyncStorage.getItem(this.SPOTIFY_REFRESH);
            if(spotifyToken === null || spotifyExpiration === null || spotifyRefresh === null){
                return null;
            }
            const returnObject = {
                'access_token': spotifyToken,
                'refresh_token': spotifyRefresh,
                'expires_in': spotifyExpiration,
            }
            return returnObject;
        }catch(error){
            console.log(error.message);
        }
        
    };

    async asyncSaveItemToStore(key,value){
        try{
            console.log(key);
            console.log(value);
            await AsyncStorage.setItem(key,value);
            console.log('saved');
        } catch (error){
            console.log(error.message);
            return false;
        }
    };
}