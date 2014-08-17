'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
	'ngAnimate',
  'leaflet-directive'
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
  
  $urlRouterProvider.otherwise("/");
});