// dependencies

var express = require( 'express' );
var config  = require( '../config/app' );
var app     = express();
var router  = express.Router();

module.exports = function( io ) {

  // controllers

  var app_controller = require( '../controllers/app' )( io );

  // initialize routes

  router.get('/', function( req, res ) {

    res.render('pages/index', {
      generated_code: app_controller.generate_code(),
      code_url      : config.code_url
    });

  });

  router.get('/mobile', function( req, res ) {
    res.render('pages/mobile');
  });

  return router;

};