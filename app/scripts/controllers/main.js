'use strict';

/**
 * @ngdoc function
 * @name oakCrimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oakCrimeApp
 */
angular.module('oakCrimeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get("http://data.oaklandnet.com/resource/ym6k-rx7a.json")
    	.then(function(data){
    		// most recent crime
    		$scope.mostRecent = _.max(data.data, function(c){
    			return Date.parse(c.datetime)
    		})

    		$scope.oldest = _.min(data.data, function(c){
    			return Date.parse(c.datetime)
    		})
    		$scope.crimes = data.data
    	})
  });
