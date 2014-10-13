'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
  'ui.bootstrap'
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
