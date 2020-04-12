/**
 * Request handler for spotify authorization request
 */

import {Router} from 'express';
import AuthorizationResponse from './response/authorization-response';
import SpotifyAuthorziationHandler from '../../service/authorization/spotify-authorization-handler';

const spotifyAuthHandler = new SpotifyAuthorziationHandler();
const router = new Router();

// Redirects request to start Spotify authoirzation flow
router.get('/', function(req, res) {
  res.redirect(spotifyAuthHandler.getSpotifyAuthorizationUri());
});

// Handles the callback response from spotify during the enduser authorization process
router.get('/callback', function(req, res) {
  // user either did not accept or an unknown error occurred
  if (req.query.error || !req.query.code) {
    const response = new AuthorizationResponse('', true, 'something went wrong');
    res.send(response);
  }
  const authorizationResult =
  spotifyAuthHandler.asyncHandleSpotifyCallback(req.query.code);
  authorizationResult.then((data) => {
    const response = new AuthorizationResponse(data);
    res.send(response);
  }).catch( (error) => {
    const response = new AuthorizationResponse('', true, error);
    res.send(response);
  });
});


// renews the enduser's authorization token using their refresh_token
router.post('/refresh', function(req, res) {
  if (!req.body || !req.body['refresh_token']) {
    const response = new AuthorizationResponse('', true, 'something went wrong');
    res.send(response);
  }
  const refreshToken = req.body['refresh_token'];
  const newAuthorizationToken =
  spotifyAuthHandler.asyncRefreshSpotifyToken(refreshToken);
  newAuthorizationToken.then((data) => {
    const response = new AuthorizationResponse(data);
    res.send(response);
  }).catch( (error) => {
    console.log(error);
    const response = new AuthorizationResponse('', true, error);
    res.send(response);
  });
});
export default router
;
