app.service('Crime', function($http){
	var Crime = {};

	Crime.getTotals = function(cb, errcb){
		$http.get('/api/crimeTotals')
			.then(cb, errcb)
	};

	Crime.getCrimesByDate = function(start, end, cb){
		return $http.get('/api?start=' + start + '&end=' + end).success(cb)
	}

	return Crime;

})