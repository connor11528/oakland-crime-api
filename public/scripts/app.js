'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngTagsInput',
  'daterangepicker'
]);

// routing
app.config(function($stateProvider, $urlRouterProvider){    
  $stateProvider
      .state("main", {
          url: "/",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
      .state("accordion", {
          url: "/accordion",
          controller: 'MainCtrl',
          templateUrl: 'views/accordion.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      })
  
  $urlRouterProvider.otherwise("/");
});
