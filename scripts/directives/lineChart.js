'use strict';

app.directive('lineChart', function(){
	var margin = { top: 20, right: 25, bottom: 20, left: 25 },
		height = 500,
		radius = 8;

	return {
		restrict: 'A',
		scope: {
			val: '=',
			currentDay: '='
		},
		link: function(scope, elem, attrs){
			// use width from bootstrap class
			var width = $(elem[0]).width()

			// set up SVG
			var svg = d3.select(elem[0])
				.append('svg')
					.attr('width', width)
					.attr('height', height);

			// watch val attr for changes
			scope.$watch('val', function(dates){
				if(!dates) return;

				// D3 LINE GRAPH
				// =============

				// create scale functions
				var minDate = d3.min(dates, function(d){
					return new Date(d.date)
				})
				var maxDate = d3.max(dates, function(d){
					return new Date(d.date)
				})

				var xScale = d3.time.scale()
					.domain([minDate, maxDate])
					.range([ margin.left, width - margin.right ])

				var yScale = d3.scale.linear()
					.domain([0, d3.max(dates, function(d){
						// scale for maximum number of crimes
						return d.numCrimes + 10
					})])
					.range([margin.top, height - margin.bottom])

				// create axis
				var xAxis = d3.svg.axis().scale(xScale).orient('top')
				var yAxis = d3.svg.axis().scale(yScale).orient('left')

				// add axis to SVG
				svg.append('g').attr({
					'class': 'axis',
					transform: 'translate(' + [0, margin.top] + ')'
				}).call(xAxis)

				svg.append('g').attr({
					'class': 'axis',
					transform: 'translate(' + [margin.left, 0] + ')'
				}).call(yAxis)

				// create visualization
				svg.selectAll('circle')
					.data(dates)
					.enter()
						.append('circle')
						.attr({
							fill: 'rgba(197, 44, 44, 0.9)',
							r: radius,
							cx: function(d, i){
								return xScale(new Date(d.date))
							},
							cy: function(d){
								return yScale(d.numCrimes)
							}
						})
						.on('click', function(d){

							// you like that shit?
							scope.$apply(function(){
								scope.$parent.currentDay = d
							})							
						})
			})
		}
	}
})