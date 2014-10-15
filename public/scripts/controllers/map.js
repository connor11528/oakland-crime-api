
app.controller('MapCtrl', function($scope, Crime){

	// get crimes for date range
	// Crime.getCrimes(startDate, endDate)

	var oakland = { center: { latitude: 37.810026, longitude: -122.268539 }, zoom: 14 };
	$scope.options = {scrollwheel: false};

    $scope.map = {
        center: oakland.center,
        zoom: oakland.zoom
    };

    // angular google maps circle: http://angular-ui.github.io/angular-google-maps/#!/api
	$scope.circle = {
        center: { latitude: 37.810026, longitude: -122.268539 },
        radius: 800,
        stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 0.8
        },
        fill: {
            color: '#08B21F',
            opacity: 0.3
        },
        geodesic: true,
        draggable: true,
        clickable: true, 
        editable: false, 
        visible: true
    };

    $scope.crimesInArea = [];
    function createCrimeMarker(crime){
    	return { 
    		crimeId: crime.idx, 
    		latitude: crime.location[0], 
    		longitude: crime.location[1] 
    	};
    };

    // Google Circle API: https://developers.google.com/maps/documentation/javascript/reference#Circle
    $scope.circleEvents = {
    	dragend: function(circle, e, model, args) {
    		var map = circle.getMap();

    		// Get the LatLngBounds of the circle
    		var circleArea = circle.getBounds();

    		var mockCrime = {idx: 13, location:[ "37.810026", "-122.268539" ] };
    		var crime = createCrimeMarker(mockCrime);
    		console.log(crime);

    		console.log(circleArea)

    		var containsCrime = circleArea.contains({ 
    			lat: parseFloat(crime.longitude), 
    			lng: parseFloat(crime.latitude) 
    		})

    		console.log(containsCrime);

    		if(containsCrime){
    			console.log('circle contains the crime!')
    			$scope.crimesInArea.push(crime)
    		}
    		// google maps is updated outside angular scope
    		// $scope.$apply(function(){ })
    	}
    };
    
});