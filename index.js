const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:auth/auth');


app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);


const port = process.env.PORT || 3090
const server = http.createServer(app);
server.listen(port);
console.log('app is listening on port: ', port)