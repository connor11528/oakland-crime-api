'use strict';

app.directive('lineChart', function(){
	var margin = { top: 30, right: 25, bottom: 20, left: 30 },
		height = 500,
		radius = 4;

	// date helper
	var makeDate = function(toConvert){
		var dateString = moment(toConvert + ', 2014').format()
		return new Date(dateString)
	}

	// generate unique id from date
	var uniqueId = function(d){
		return 'text' + d.date.split(' ').join('');
	}

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
					return makeDate(d.date)
				})
				var maxDate = d3.max(dates, function(d){
					return makeDate(d.date)
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

				// create axis functions
				var xAxis = d3.svg.axis().scale(xScale).orient('top').tickPadding(8)
				var yAxis = d3.svg.axis().scale(yScale).orient('left').tickPadding(8)

				// create x axis elements inside group
				svg.append('g').attr({
					'class': 'axis',
					transform: 'translate(' + [0, margin.top] + ')'
				}).call(xAxis)

				// create y axis elements inside group
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

								return xScale(makeDate(d.date))
							},
							cy: function(d){
								return yScale(d.numCrimes)
							}
						})
						.on('click', function(d){
						
							// update scope in controller
							// =========================
							scope.$apply(function(){
								scope.$parent.currentDay = d
							})	

						})
						.on('mouseover', function(d, i){
							// enlarge radius
							d3.select(this)
								.transition().duration(100)
								.attr({
									r: radius * 2
								})

							// add text box
							svg.append('text')
								.attr({
									// id for each text box
									id: uniqueId(d),
									x: function(){ 
										var xlocation = makeDate(d.date);

										// add one day to x location
										var toolTipX = new Date(d.date);
										toolTipX.setFullYear(2014)
										toolTipX.setDate(toolTipX.getDate() + 1);
										// plot new date as point on scale
										return xScale(toolTipX)
									},
									y: function(){ return yScale(d.numCrimes) + 5 }
								})
								.text(function(){
									// set text
									var toShow = [d.date, d.numCrimes]
									return 'Date: ' + toShow[0] +
										' Crimes commited: ' + toShow[1]
								})
						})
						.on('mouseout', function(d, i){
							// scale back radius
							d3.select(this)
								.transition().duration(100)
								.attr({
									r: radius
								})

							// remove text box by its unique id
							d3.select('#' + uniqueId(d))
								.transition()
								.duration(100)
								.remove()
						})
			})
		}
	}
})