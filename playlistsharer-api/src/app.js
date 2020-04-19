import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/server-config';

import defaultRoute from './routes/index';

const app = express();
const port = config.PORT;
const APIDocV1 = express.static(__dirname + '/docs/');
const main = express.static(__dirname + '/static/');

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan());
app.use(bodyParser.json());

app.use('/', main);
app.use('/api/v1', APIDocV1);
app.use(defaultRoute);

app.listen(port, function() {
  console.log(`Starting Shareable Playlist Api ${config.PORT}`);
  const runtimeENV = process.env.NODE_ENV || 'dev';
  console.log(`Running in ${runtimeENV}`);
  if (runtimeENV !== 'production') {
    console.log(config);
  }
})
;
