import {Router} from 'express';
import spotify from '../../service/spotify/spotify';

const router = Router();

router.get('/spotify',function(req,res){
   const authorizationStatus = spotify.handleAuthorizationCallback(req);
    res.send(authorizationStatus); 
});
export default router