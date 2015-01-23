var gulp      = require( 'gulp' ),
  uglify      = require( 'gulp-uglify' ),
  browserify  = require( 'gulp-browserify' ),
  source      = require( 'vinyl-source-stream' ),
  notify      = require( 'gulp-notify' );

module.exports = function() {

  gulp.src( './source/javascripts/**/*.js' )
    .pipe(browserify({
      insertGlobals : false,
      debug         : false
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( './public/javascripts' ) )
    .pipe( notify( { message: "browserify executed!" } ) );

};