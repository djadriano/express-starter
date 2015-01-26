// dependencies

var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var io      = require( 'socket.io' )( http );
var routes  = require( './routes/app' )( io );

// controllers

var app_controller = require( './controllers/app' )( io );

// template engine

app.set( 'view engine', 'ejs' );

// define public assets folder

app.use( express.static( __dirname + '/public' ) );

// routes

app.use( '/', routes );

io.on('connection', function( socket ) {

  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

// initialize server

http.listen(3000, function(){
  console.log( 'listening on *:3000' );
});