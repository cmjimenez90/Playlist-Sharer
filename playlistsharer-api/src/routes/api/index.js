/**
 * Main routing hub for /v1/*
 * Imports routing paths for spotify and apple music
 */
import {Router} from 'express';
import v1 from './v1';

const router = new Router();
router.use('/v1', v1);

export default router;
