const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const comments = require('./routes/comments');
const films = require('./routes/film');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());

app.use('/api/comment', cors(), comments);
app.use('/api/film', cors(), films);

module.exports = app;
