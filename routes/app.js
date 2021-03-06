// dependencies

var express        = require( 'express' );
var config         = require( '../config/app' );
var io_controller  = require( '../controllers/socket' );
var app            = express();
var router         = express.Router();

module.exports = function() {

  router.get('/', function( req, res ) {
    res.render('pages/index', {
      code_url : config.code_url
    });
  });

  router.get('/mobile', function( req, res ) {
    res.render( 'pages/mobile' );
  });

  return router;

};