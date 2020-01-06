import {Router} from 'express';
import authorization from '../routes/authorization/authorization'
const router = Router();

router.use('/authorize',authorization)
router.get('/*', function(req,res){
    res.send("Welcome to Shareable Playlists");
});

export default router;