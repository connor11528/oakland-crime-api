
app.controller('SalariesCtrl', function($scope, $http, $q){

	$scope.crimes = [];
	Papa.parse('../../data/OPD_140722_1.csv', {
		download: true,
		worker: true,
		step: function(row) {
			console.log(row.data[0]);
			$scope.crimes.push(row.data)
		},
		complete: function() {
			console.log("All done!");
			$scope.$apply();
		}
	});


});