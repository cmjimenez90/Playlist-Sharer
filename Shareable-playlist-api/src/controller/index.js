import {Router} from 'express';

const router = Router();
router.get('*', function(req,res){
    res.send("Welcome to Shareable Playlists");
});

export default router;