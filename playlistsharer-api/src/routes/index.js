/**
 * Global route loader
 *
 * Manages and imports all routes needed for the API
 */


import {Router} from 'express';
import authorization from '../routes/authorization/index';
import api from '../routes/api/index';


const router = new Router();
router.use('/authorize', authorization);
router.use('/api', api);
export default router;
