var app = angular.module('brewer_map', ['ui.router', 'ui.bootstrap']);


app.filter('srmColor', function() {
	return function(number) {
		return Brauhaus.srmToCss(number);
	}
});
app.filter('Oz', function() {
	return function(number) {
		return Brauhaus.kgToLbOz(number);
	}
});

app.controller('map', function($scope){
	
});
app.controller('form', function($scope, $rootScope, $http) {
	$rootScope.siteTitle = 'BeerBin';
	$scope.form = {};
	$scope.form.entry = {};
	$scope.form.lat = 'test';
	$scope.form.long = 'test2';
	$scope.recipes = []
	$scope.do = function() {
		var beerxml = $scope.form.beerxml;
		var xmlRecipes = Brauhaus.Recipe.fromBeerXml(beerxml);
		var xmlRecipe = xmlRecipes[0];
		xmlRecipe.calculate();
		var timeline = xmlRecipe.timeline(false);
		var data = {
			data: xmlRecipe,
			timeline: timeline
		}
		$scope.recipes.push(data);
	}
	$scope.convertUnits = function(number, type) {
		var amount = Brauhaus.kgToLbOz(number);
		if(type == 'oz') {
			return amount.oz;
		}
		if(type == 'lb') {
			return amount.lb;
		}
	}
	$scope.ppg = function(number) {
		return Brauhaus.yieldToPpg(number);
	}
	$scope.duration = function(d) {
		return Brauhaus.displayDuration(d, 2);
	}



});