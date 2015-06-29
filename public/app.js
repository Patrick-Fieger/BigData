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


app.run(function($rootScope) {
	$rootScope.toggleInfoView = function(){
		if($('.info_authors').hasClass('icon-info')){
			$('.info_authors').removeClass('icon-info').addClass('icon-cross');
			$('.info_wrapper').toggleClass('active');
		}else{
			$('.info_authors').removeClass('icon-cross').addClass('icon-info');
			$('.info_wrapper').toggleClass('active');
		}

	}
});


var ctrl = angular.module('app.ctrl', [])
.controller('IndexController', index)