'use strict';

module.exports = angular.module( 'ytio.app', [] )
  .controller('ytio.app.controller', ['$scope', function( $scope ) {

    $scope.socket = io();

    $scope.socket_info = {
      desktop: '',
      mobile : ''
    };

  }])
  .directive('ytioApp', function() {
    return {
      restrict  : 'A',
      controller: 'ytio.app.controller'
    };
  });