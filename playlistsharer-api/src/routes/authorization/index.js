/**
 * Route manager for Spotify and Apple authorization
 */

import {Router} from 'express';
import spotify from './spotify';
import apple from './apple';

const router = new Router();
router.use('/spotify-music', spotify);
router.use('/apple-music', apple);

export default router;
