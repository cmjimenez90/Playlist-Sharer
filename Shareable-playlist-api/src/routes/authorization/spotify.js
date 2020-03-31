import {Router} from 'express';
import AuthorizationResponse from './response/authorization-response';
import SpotifyAuthorziationHandler from '../../service/authorization/spotify-authorization-handler';

const spotifyAuthHandler = new SpotifyAuthorziationHandler();
const router = new Router();

router.get('/', function(req, res) {
  res.redirect(spotifyAuthHandler.getSpotifyAuthorizationUri());
});

router.get('/callback', function(req, res) {
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
