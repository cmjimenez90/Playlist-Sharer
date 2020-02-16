import {Router} from 'express';
import SpotifyAuthorziationHandler from '../../service/authorization/spotify-authorization-handler';

const spotifyAuthHandler = new SpotifyAuthorziationHandler();
const router = new Router();

router.get('/spotify', function(req, res) {
  res.redirect(spotifyAuthHandler.getSpotifyAuthorizationUri());
});

router.get('/spotify/callback', function(req, res) {
  if (req.query.error || !req.query.code) {
    res.send('something went wrong');
  }
  const authorizationResult =
  spotifyAuthHandler.asyncHandleSpotifyCallback(req.query.code);
  authorizationResult.then((data) => {
    res.send(data);
  }).catch( (error) => {
    res.send('something went wrong');
  });
});

router.post('/spotify/refresh', function(req, res) {
  if (!req.body || !req.body['refresh_token']) {
    console.log(req.body);
    res.send('something went wrong');
  }
  const refreshToken = req.body['refresh_token'];
  const newAuthorizationToken =
  spotifyAuthHandler.asyncRefreshSpotifyToken(refreshToken);
  newAuthorizationToken.then((data) => {
    res.send(data);
  }).catch( (error) => {
    console.log(error);
    res.send('something went wrong');
  });
});
export default router
;
