'use strict';

app.service('DataParser', function($q){
	return {
		// read CSV file and return a promise
		readFile: function(url){
			var dfd = $q.defer();
			d3.csv(url, function(awards){
				dfd.resolve(awards)
			});
			return dfd.promise;
		}
	}

})