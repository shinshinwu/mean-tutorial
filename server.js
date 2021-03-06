process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
// adding user authentication
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = express();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');