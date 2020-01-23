const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const comments = require('./routes/comments');
const films = require('./routes/film');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/comment', comments);
app.use('/api/film', films);

module.exports = app;
