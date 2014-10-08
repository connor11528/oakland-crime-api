'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router'
]);

// routing
app.config(function($stateProvider, $urlRouterProvider){    
  $stateProvider
      .state("crimes", {
          url: "/crimes",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
      .state("policeBeats", {
          url: "/policeBeats",
          controller: 'PoliceBeatsCtrl',
          templateUrl: 'views/policeBeats.html'
      })
      .state('awards', {
        url: '/awards',
        templateUrl: 'views/awards.html',
        controller: 'AwardsCtrl'
      })
      .state('salaries', {
        url: '/salaries',
        templateUrl: 'views/salaries.html',
        controller: 'SalariesCtrl'
      })
  
  $urlRouterProvider.otherwise("/");
});
