'use strict';

var app = angular.module('oakCrimeApp', [
	'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngTagsInput',
  'daterangepicker',
  'google-maps'.ns()
]);

app.config(["$stateProvider", "$urlRouterProvider", 'GoogleMapApiProvider'.ns(), 
  function($stateProvider, $urlRouterProvider, GoogleMapApi){  

    GoogleMapApi.configure({
        key: 'AIzaSyBew-TghtDSGedK_43qRtmxb2Y95ikwg24',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
  
    // routing
    $stateProvider
      .state("main", {
          url: "/",
          controller: 'MainCtrl',
          templateUrl: 'views/main.html'
      })
      .state("map", {
          url: "/map",
          controller: 'MapCtrl',
          templateUrl: 'views/map.html'
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
      .state('documentation', {
        url: '/documentation',
        templateUrl: 'views/documentation.html'
      });
  
  $urlRouterProvider.otherwise("/");
}]);
