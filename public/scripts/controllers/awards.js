'use strict';

app.controller('AwardsCtrl', function($scope, DataParser){

	DataParser.readFile('data/opdofficerawards07_13.csv').then(function(results){
		var awards = _.map(results, function(award, i){
			delete award[""];	// clean up
			return award
		});

		var awardsByType = _.groupBy(awards, 'Name_of_Award');
		var awardsBySender = _.groupBy(awards, 'Award_Sender');
		var awardsByRank = _.groupBy(awards, 'Rank')
	
		var awardTypes = _.keys(awardsByType)
		console.log(awardsByType)

		console.log(_.flatten(_.values(awardsByType)))

		// data for the donut directive
		$scope.awardTypePie = {
			_type : "terms",
			missing : 0,
			total : _.flatten(_.values(awardsByType)).length,
			other : 0,
			terms : []
		};
		
		$scope.awardTypePie.terms = _.map(awardTypes, function(awardType){
			return {
				term: awardType,
				count: awardsByType[awardType].length
			}
		})
	});

// Award_Sender: "Internal"
// Date_of_Award: "1/8/2007"
// Name: "Beaver, Michael L."
// Name_of_Award: "Captain's Certificate of Commendation"
// Rank: "Sergeant of Police (PERS)"
	

	// example code..
	$scope.Product = {
		_type : "terms",
		missing : 0,
		total : 454,
		other : 0,
		terms : [{
			term : "Prod-A",
			count : 306
			},{
			term : "Prod-B",
			count : 148
			},{
			term : "Prod-C",
			count : 62
		}]
	};

})