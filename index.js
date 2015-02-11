// dependencies

var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var io      = require( 'socket.io' )( http );
var routes  = require( './routes/app' )( io );

// controllers

var app_controller = require( './controllers/app' );
var io_controller  = require( './controllers/socket' );

// template engine

app.set( 'view engine', 'ejs' );

// define public assets folder

app.use( express.static( __dirname + '/public' ) );

// routes

app.use( '/', routes );

// initialize server

http.listen(3000, function(){
  console.log( 'listening on *:3000' );
});


io.on('connection', function( socket ) {

  io_controller.initialize( io, socket );

  socket.on('disconnect', function() {
    console.log('disconnect');
    io_controller.disconnect( socket.id );
  });

});