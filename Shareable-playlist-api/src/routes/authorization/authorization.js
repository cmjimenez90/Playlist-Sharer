import {Router} from 'express';
import spotify from '../../service/spotify/spotify';

const router = Router();

router.get('/spotify',function(req,res){
    if(req.query.error || !req.query.code){
        res.send("something went wrong");
    }
    const authorizationResult = spotify.asyncHandleAuthorizationCallback(req.query.code);
    authorizationResult.then((data) => {
        res.send(data);
    }).catch( (error) => {
        res.send("something went wrong");
    });
});
export default router