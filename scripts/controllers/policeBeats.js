'use strict';

app.controller('PoliceBeatsCtrl', function($scope, $http){
	// var tileLayers = {
	// 	gangInjunctions: {
	// 		url: 'http://{s}.tile.something.tileStuff'
	// 	},
	// 	policeBeats: {
	// 		url: 'http://{s}.tile.something.tileStuff'
	// 	},
	// 	communityBeats: {
	// 		url: 'http://{s}.tile.something.tileStuff'
	// 	}
	// }

	angular.extend($scope, {
	      oakland: {
	        lat: 37.802674, 
	        lng: -122.228966,
	        zoom: 12
	      },
	      defaults: {}
	  });

	// grab KML data
	$http.get('data/oak_policebeats_0.kml').then(function(xml){
		var policeBeats = toGeoJSON.kml($.parseXML(xml.data));
		
		angular.extend($scope, {
			geojson: {
				data: policeBeats,
				style: {
	                fillColor: "green",
	                weight: 2,
	                opacity: 1,
	                color: 'white',
	                dashArray: '3',
	                fillOpacity: 0.7
	            }
			}
		})
	})

})