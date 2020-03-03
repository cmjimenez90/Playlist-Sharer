import {Router} from 'express';
import v1 from './v1';

const router = new Router();
router.use('/v1', v1);
router.get('/*', function(req, res) {
  res.send('ShareablePlaylist API');
});

export default router;
