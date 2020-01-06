import axios from 'axios'
import config from '../../config/server-config'

const spotifyAuthorizeUrl = "https://accounts.spotify.com/authorize"
const spotifyTokenUrl = "https://accounts.spotify.com/api/token"

function handleAuthorizationCallback(request){
    if(request.query.error || !request.query.code){
        return {
            state: "failure",
            refreshToken: "",
            expiresIn: "",
            accessToken: ""
        };
    }
    
    axios.post(spotifyTokenUrl,{
        data: {
            grant_type: "authorization_code",
            code: request.query.code,
            redirect_uri: config.SPOTIFY_REDIRECT_URI,
            client_id: config.SPOTIFY_CLIENTID,
            client_secret: config.SPOTIFY_SECRET
        }
    }).then(function(response){
        if(response.status !== 200){throw "something went wrong authorizing spotify user";}
        return {
            state: "success",
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
            accessToken: response.data.access_tokens
        }
    }).catch(function(error){
        return {
            state: "failure",
            refreshToken: "",
            expiresIn: "",
            accessToken: ""
        }
    });
}

export default {
    handleAuthorizationCallback
}