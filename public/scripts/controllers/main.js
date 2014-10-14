'use strict';

app.controller('MainCtrl', function($scope, $http, Crime) {
    $scope.crimeTypes = [];
    $scope.crimeCategories = [];
    $scope.dateRange = { startDate: null, endDate: null };

    $http.get('/api/crimeTotals').then(function(res){
        $scope.crimeTypes = res.data.crimeTypes;
        $scope.policeBeats = res.data.beats;
        $scope.crimeCategories = res.data.categories;
    }, function(err){ console.error(err); });

    $scope.formatDate = function(date){
    	return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    };

    $scope.getCrimes = function(){
    	Crime.getCrimesByDate($scope.dateRange.startDate, $scope.dateRange.endDate, function(res){
    		$scope.crimes = res;
    		var crimeCategories = getCategories($scope.crimes);
    		var categoryCounts = getCountByCategory(crimeCategories, $scope.crimes);
    		// should be a directive..
    		createPolarArea(categoryCounts);
    	});
    };
});

// CanvasJS Polar Area Chart
function getCategories(crimes){
	var categories = [];
	angular.forEach(crimes, function(crime){
		if(!_.contains(categories, crime.crimetype)){
			categories.push(crime.crimetype);
		}
	});
	return categories;
}

function getCountByCategory(categories, crimes){
	var groupedByCategory = _.groupBy(crimes, "crimetype");
	var counts = _.map(groupedByCategory, function(value, key){
		// array of objects for CanvasJS
		return  {
			label: key,
			value: value.length
	    };
	});
	return counts;
};

function createPolarArea(countsByCategory){
	var ctx = document.getElementById("myChart").getContext("2d");
	new Chart(ctx).PolarArea(countsByCategory, {});
}