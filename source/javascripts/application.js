require( 'angular/angular' );

angular.module('ytio', [
  require( './app/'       ).name,
  require( './app/player' ).name,
  require( './desktop/'   ).name,
  require( './mobile/'    ).name
]);