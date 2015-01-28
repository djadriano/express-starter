var app_controller = require( '../controllers/app' );

var io,
    socket;

var arrFoo = [];

function enterDesktop() {
  generateCode();
}

function generateCode() {

  var generate_code = app_controller.generate_code();

  saveAppCodes( generate_code );

}

function saveAppCodes( code ) {

  arrFoo.push({
    id  : socket.id,
    code: code
  });

  socket.join( code );

  socket.emit( 'generated_code', code );

  console.log('code', code);

}


exports.initialize = function( io_param, socket_param ) {

  io     = io_param;
  socket = socket_param;

  socket.on( 'enterDesktop', enterDesktop );

};

exports.disconnect = function( socket_id ) {

  arrFoo.forEach(function( item, i ) {
    if( item.id == socket_id ) {
      arrFoo.splice( i, 1 );
    }
  });

};

exports.validateCode = function( code, cb ) {

  var search_code = arrFoo.filter(function( item ) {
    return ( item.code == code );
  });

  search_code.length ? cb( true ) : cb( false );

};