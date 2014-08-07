'use strict';

app.directive('lineChart', function(){
	var width = 900,
		height = 500;

	return {
		restrict: 'A',
		scope: {
			val: '='
		},
		link: function(scope, elem, attrs){
			// set up SVG
			var svg = d3.select(elem[0])
				.append('svg')
					.attr('width', width)
					.attr('height', height);

			// dates === crimes
			scope.$watch('val', function(dates){
				if(!dates) return;

				// D3 LINE GRAPH
				// =============

				// set scales
				var minDate = d3.min(dates, function(d){
					return new Date(d.date)
				})
				var maxDate = d3.max(dates, function(d){
					return new Date(d.date)
				})

				var xScale = d3.time.scale()
					.domain([minDate, maxDate])
					.range([ width ])

				console.log(xScale)


			})
		}
	}
})