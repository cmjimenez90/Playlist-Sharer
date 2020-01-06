import axios from 'axios';
import queryString from 'qs';
import config from '../../config/server-config';

const spotifyAuthorizeUrl = "https://accounts.spotify.com/authorize"
const spotifyTokenUrl = "https://accounts.spotify.com/api/token"

async function asyncHandleAuthorizationCallback(code) {
    const postParameters = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: config.SPOTIFY_REDIRECT_URI,
        client_id: config.SPOTIFY_CLIENTID,
        client_secret: config.SPOTIFY_SECRET
        
    }
    const postOptions = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: queryString.stringify(postParameters),
        url: spotifyTokenUrl
    }
    try{
        const result = await axios(postOptions);
        return result.data;
    }catch (error){
        console.log(error);
    }
    
}


export default {
    asyncHandleAuthorizationCallback
}