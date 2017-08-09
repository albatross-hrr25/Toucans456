var express = require('express');
// var bodyparser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', function (req, res) {
//   res.send('hello world');
// });

module.exports = app;