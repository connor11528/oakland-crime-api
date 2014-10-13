'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngTagsInput'
]);

// routing
app.config(function($stateProvider, $urlRouterProvider){    
  $stateProvider
      .state("main", {
          url: "/",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
  
  $urlRouterProvider.otherwise("/");
});
