'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
	'ngAnimate'
])

app.config(function($stateProvider, $urlRouterProvider){    
  $stateProvider
      .state("crimes", {
          url: "/crimes",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
      .state("policeBeats", {
          url: "/policeBeats",
          templateUrl: 'views/policeBeats.html'
      })
      .state('awards', {
        url: '/awards',
        templateUrl: 'views/awards.html'
      })
      .state('salaries', {
        url: '/salaries',
        templateUrl: 'views/salaries.html'
      })
  
  $urlRouterProvider.otherwise("/");
})