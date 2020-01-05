const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');


const app = express();
const port = 80;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan());

app.use(require('./controllers'));

app.listen(port, function(){
    console.log("Starting Shareable Playlist Api on Port 80");
})