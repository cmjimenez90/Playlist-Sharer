import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const port = 80;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan());

import defaultRoute from './controller/index';


app.use('/',defaultRoute);

app.listen(port, function(){
    console.log("Starting Shareable Playlist Api on Port 80");
})