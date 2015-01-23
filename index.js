// dependencies

var express = require('express');
var app     = express();

// template engine

app.set('view engine', 'ejs');

// define public assets folder

app.use( express.static( __dirname + '/public' ) );

// routes

app.get('/', function (req, res) {
  res.render('pages/index');
});

// initialize server

var server = app.listen(3000, function () {
  console.log('Example app server');
});