'use strict';

var app = angular.module('flight', ['ngRoute','ngSanitize','app.ctrl']);


app.config(['$locationProvider','$routeProvider','$animateProvider', function($locationProvider,$routeProvider,$animateProvider) {
  $locationProvider.html5Mode(false);

  $routeProvider
  .when('/', {
    templateUrl: '/templates/index.html',
    controller: 'IndexController'
  })
  .otherwise({ redirectTo: '/' });


}])


app.run(function() {
	
});


var ctrl = angular.module('app.ctrl', [])
.controller('IndexController', index)