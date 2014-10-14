'use strict';

app.controller('MainCtrl', function($scope, $http, Crime) {
    $scope.crimeTypes = [];
    $scope.crimeCategories = [];
    $scope.categoryCounts = [];
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
    		$scope.categoryCounts = getCountByCategory(crimeCategories, $scope.crimes);
    		// should be a directive..
    	});
    };
});

// all categories in an array of crime objects
function getCategories(crimes){
	var categories = [];
	angular.forEach(crimes, function(crime){
		if(!_.contains(categories, crime.crimetype)){
			categories.push(crime.crimetype);
		}
	});
	return categories;
}

// create array of objects to pass to CanvasJS PolarArea
function getCountByCategory(categories, crimes){
	var groupedByCategory = _.groupBy(crimes, "crimetype");
	var counts = _.map(groupedByCategory, function(value, key){
        var color = Please.make_color()[0];
        var rgb = Please.HEX_to_RGB(color)
        // highlight shade sometimes spits out hexadecimal decimals (ie "#5f4f4f.8")
        var highlight = Please.RGB_to_HEX({ r: rgb['r']*.5, g: rgb['b']*.5, b: rgb['b']*.5 });

		return  {
			label: key,
			value: value.length,
            color: color,
            highlight: highlight
	    };
	});
	return counts;
};