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

  // socket.join( code );

  io.in( socket.id ).emit( 'generatedCode', code );

  console.log( 'code --->', code );

}

exports.initialize = function( io_param, socket_param ) {

  io     = io_param;
  socket = socket_param;

  socket.on( 'enterDesktop', enterDesktop );
  socket.on( 'validateCode', validateCode );

};

exports.disconnect = function( socket_id ) {

  arrFoo.forEach(function( item, i ) {
    if( item.id == socket_id ) {
      arrFoo.splice( i, 1 );
    }
  });

};

function validateCode( code ) {

  var code_by_user = code.a + code.b + code.c + code.d;

  var search_code = arrFoo.filter(function( item ) {
    return ( item.code == code_by_user );
  });

  var socket_data = {
    desktop_id : '',
    mobile_id  : socket.id,
    validate   : false
  };

  if( search_code.length ) {

    socket_data.validate   = true;
    socket_data.desktop_id = search_code[ 0 ].id,

    // send message to desktop
    io.sockets.connected[ search_code[ 0 ].id ].emit( 'codeWasValidatedDesktop', socket_data );

    // send message to mobile
    io.sockets.in( socket.id ).emit( 'codeWasValidatedMobile', socket_data );

    // register event play video of desktop

    io.sockets.connected[ search_code[ 0 ].id ].on('playVideo', function( data ) {

      io.sockets.connected[ search_code[ 0 ].id ].emit( 'playedVideo' );
      io.sockets.connected[ data.mobile ].emit( 'playedVideo' );

    });

    // register event play video of desktop

    io.sockets.connected[ socket.id ].on('playVideo', function( data ) {
      console.log('playVideoMobile', data);
    });

  } else {

    // send message to mobile
    io.sockets.in( socket.id ).emit( 'codeWasValidatedMobile', socket_data );

  }

};