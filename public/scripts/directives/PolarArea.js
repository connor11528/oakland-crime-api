app.directive('polarArea', function(){

	return {
		restrict: 'EA',
		template: '<canvas></canvas>',
		scope: {
			categoryCounts: '=categoryCounts'
		},
		link: function(scope, elem, attrs, ctrl){
			scope.$watch('categoryCounts', function(categoryCounts){
				var canvas = elem.find('canvas')[0];
				canvas.width = 600;
				canvas.height = 400;
				var ctx = canvas.getContext("2d")
				new Chart(ctx).PolarArea(categoryCounts, {});
			});
		}
	};
})