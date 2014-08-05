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
  	// get all crime data as array of objects
    $http.get("http://data.oaklandnet.com/resource/ym6k-rx7a.json")
    	.then(function(data){
    		var allCrimes = data.data,
    		byDate = {},
    		lineData = []

    		// object of crimes for each unique day
    		_.map(allCrimes, function(crime){
    			var crimeDate = Date.parse(crime.datetime)
    			if (byDate[crimeDate]){
    				byDate[crimeDate].push({
    					'policebeat': crime.policebeat,
    					'crimetype': crime.crimetype,
    					'description': crime.description
    				})
    			} else {
    				byDate[crimeDate] = [{
    					'policebeat': crime.policebeat,
    					'crimetype': crime.crimetype,
    					'description': crime.description
    				}]
    			}
    		})

    		var uniqueDates = _.keys(byDate).sort()

    		_.map(uniqueDates, function(d){
    			lineData.push({
    				date: d,
    				totalCrimes: byDate[d].length
    			})
    		})

    		return lineData
    	}).then(function(lineData){
    		$scope.crimes = lineData
    	}, function(err){
    		$scope.crimes = err
    	})

  });


// // most recent crime
// $scope.mostRecent = _.max(data.data, function(c){
// 	return Date.parse(c.datetime)
// })

// $scope.oldest = _.min(data.data, function(c){
// 	return Date.parse(c.datetime)
// })