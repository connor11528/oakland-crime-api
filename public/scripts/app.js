'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
  'ui.bootstrap',
  'angular-loading-bar'
]);

app.config(["$stateProvider", "$urlRouterProvider", 
  function($stateProvider, $urlRouterProvider){  

    // routing
    $stateProvider
      .state("main", {
          url: "/",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
      .state('beat', {
        url: '/beat/:beat',
        templateUrl: 'views/beat_info.html',
        controller: 'ViewBeatCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      })
      .state('documentation', {
        url: '/documentation',
        templateUrl: 'views/documentation.html'
      });
  
  $urlRouterProvider.otherwise("/");
}]);
