app.service('Crime', function($http){
	var Crime = {};

	Crime.getTotals = function(cb, errcb){
		$http.get('/api/crimeTotals')
			.then(cb, errcb)
	};

	Crime.getCrimesByDate = function(start, end, cb){
		return $http.get('/api?start=' + start + '&end=' + end).success(cb)
	}

	Crime.searchCrimes = function(query, cb){
		$http.get('/api', { params: { q: query } })
			.success(function(res){
				cb(null, res)
			})
			.error(function(err){
				cb(err)
			});
	}

	return Crime;

})