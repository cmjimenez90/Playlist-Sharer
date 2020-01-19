import {Router} from 'express';
import spotifyAuth from '../../service/authorization/spotify/spotify-auth';

const router = new Router();

router.get('/spotify', function(req, res) {
  res.redirect(spotifyAuth.getSpotifyAuthorizationUri());
});

router.get('/spotify/callback', function(req, res) {
  if (req.query.error || !req.query.code) {
    res.send('something went wrong');
  }
  const authorizationResult =
  spotifyAuth.asyncHandleSpotifyCallback(req.query.code);
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
  spotifyAuth.asyncRefreshSpotifyToken(refreshToken);
  newAuthorizationToken.then((data) => {
    res.send(data);
  }).catch( (error) => {
    console.log(error);
    res.send('something went wrong');
  });
});
export default router
;
