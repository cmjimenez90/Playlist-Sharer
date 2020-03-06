import {Router} from 'express';
import AppleAuthorizationHandler from '../../service/authorization/apple-authorization-handler';

const appleAuthHandler = new AppleAuthorizationHandler();
const router = new Router();

router.get('/', function(req, res) {
  const appleToken = appleAuthHandler.asyncGenerateDeveloperToken();
  appleToken.then((data) => {
    res.send(data);
  }).catch( (error) => {
    res.send('something went wrong');
  });
});


export default router;
