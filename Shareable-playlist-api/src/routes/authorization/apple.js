/**
 * Request handler for apple authorization request
 */


import {Router} from 'express';
import AppleAuthorizationHandler from '../../service/authorization/apple-authorization-handler';
import AuthorizationResponse from './response/authorization-response';

const appleAuthHandler = new AppleAuthorizationHandler();
const router = new Router();

// Returns an apple music develoepr token to the reqeuster
router.get('/', function(req, res) {
  const appleToken = appleAuthHandler.generateDeveloperToken();
  if (appleToken) {
    const response = new AuthorizationResponse(appleToken);
    res.send(response);
  } else {
    const response = new AuthorizationResponse('', true, 'Failed to create developer token');
    res.send(response);
  }
});


export default router;
