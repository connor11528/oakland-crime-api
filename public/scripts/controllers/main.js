'use strict';

app.controller('MainCtrl', function($scope, $http) {
    $scope.crimeTypes = [];
    $scope.crimeCategories = [];
    $scope.status = { isOpen: true };

    $http.get('/api/crimeTotals').then(function(res){
        $scope.crimeTypes = res.data.crimeTypes;
        $scope.policeBeats = res.data.beats;
        $scope.crimeCategories = res.data.categories;
    }, function(err){ console.error(err); });


});