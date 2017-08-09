//var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/../client'));


app.get('/', function (req, res) {
  res.send('Hello world');
});


module.exports = app;
