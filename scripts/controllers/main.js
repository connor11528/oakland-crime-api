'use strict';

// sort and format list
var sortCrimesByDate = function(allCrimes){
    var crimes = allCrimes

    // sort crimes ascending order
    crimes = _.sortBy(crimes, 'datetime')

    // create more readable date form
    return _.map(crimes, function(crime){

        var day = moment(new Date(crime.datetime)).format('MMM DD')
        crime.datetime = day

        return crime
    })
};

// object for each day
var groupCrimesByDate = function(sortedCrimes){
    // creates object with dates as keys
    var groupedCrimes = _.groupBy(sortedCrimes, 'datetime')

    var days = _.keys(groupedCrimes)  
    
    // create array
    return _.map(days, function(day){
        return {
            date: day,
            numCrimes: groupedCrimes[day].length,
            crimeList: groupedCrimes[day]
        }
    })  
}

angular.module('oakCrimeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.currentDay = { parentDay: true }

  	// get and format crime data
    var init = function(){
        $http.get("http://data.oaklandnet.com/resource/ym6k-rx7a.json")
            .success(function(data){
                var sortedCrimes = sortCrimesByDate(data)

                $scope.crimes = groupCrimesByDate(sortedCrimes)
            })
            .error(function(data, status){
                $scope.error = 'Error: ' + status
            })
    }

    init()
  });