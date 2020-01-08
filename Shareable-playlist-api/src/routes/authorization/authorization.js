import {Router} from 'express';
import spotifyAuth from '../../service/authorization/spotify-auth';

const router = Router();

router.get('/spotify',function(req,res){
    res.redirect(spotifyAuth.getSpotifyAuthorizationUri());
});

router.get('/spotify/callback',function(req,res){
    if(req.query.error || !req.query.code){
        res.send("something went wrong");
    }
    const authorizationResult = spotifyAuth.asyncHandleSpotifyAuthorizationCallback(req.query.code);
    authorizationResult.then((data) => {
        res.send(data);
    }).catch( (error) => {
        res.send("something went wrong");
    });
});
export default router