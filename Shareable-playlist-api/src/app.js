import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import config from './config/server-config'

const app = express();
const port = config.PORT;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan());

import defaultRoute from './routes/index';

app.use(defaultRoute);

app.listen(port, function(){
    console.log(`Starting Shareable Playlist Api on Port ${config.PORT}`);
})