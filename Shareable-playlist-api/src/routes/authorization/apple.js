import {Router} from 'express';
import AppleAuthorizationHandler from '../../service/authorization/apple-authorization-handler';

const appleAuthHandler = new AppleAuthorizationHandler();
const router = new Router();

router.get('/', function(req, res) {
  const appleToken = appleAuthHandler.generateDeveloperToken();
  if (appleToken) {
    res.send(appleToken);
  } else {
    res.send('error');
  }
});


export default router;
