/**
 * Route manager for Spotify and Apple authorization
 */

import {Router} from 'express';
import spotify from './spotify';
import apple from './apple';

const router = new Router();
router.use('/spotify', spotify);
router.use('/apple', apple);

export default router;
