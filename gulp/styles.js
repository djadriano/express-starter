var gulp      = require( 'gulp' ),
  compass     = require( 'gulp-compass' ),
  minifyCSS   = require( 'gulp-minify-css' ),
  notify      = require( 'gulp-notify' );

module.exports = function() {

  gulp.src( './source/stylesheets/**/*.scss' )
    .pipe(compass({
      config_file: 'config.rb',
      css        : 'public/stylesheets',
      sass       : 'source/stylesheets'
    }))
    .pipe( minifyCSS() )
    .pipe( gulp.dest( './public/stylesheets' ) )
    .pipe( notify( { message: "styles executed!" } ) );

};