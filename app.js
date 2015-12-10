var app = angular.module('brewer_map', ['ui.router', 'ui.bootstrap']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
	"use strict";
	$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'vqy28dkElsQiH8xlM8Yc69vpFjDfGTV4DAinWsjU';
	$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'iI5MrD2b204dk0NE5xlG9sR1J3lkZWGfohXCnewj';
	$httpProvider.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
	$urlRouterProvider.otherwise('/');
	$stateProvider
        .state('home', {
	        url: '/',
	        templateUrl: '/templates/home.html',
	        controller: 'form'
        })
        // Register
        .state('recipe', {
	        url: '/recipe/:rid',
	        templateUrl: '/templates/recipe.html',
	        controller: 'recipe'
        });
        
	$locationProvider.html5Mode(true);
});

app.factory('api', function($http){
	var server = 'https://api.parse.com/1';
	return {
		createItem: function(type, data) {
			return $http.post(server + '/classes/' + type, data);
		},
		loadItem: function(type, id) {
			return $http.get(server + '/classes/' + type + '/' + id);
		}
	}
	
});

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
app.controller('form', function($scope, $rootScope, $http, api, $location) {
	$rootScope.siteTitle = 'BeerBin';
	$scope.form = {};
	$scope.form.entry = {};
	$scope.form.lat = 'test';
	$scope.form.long = 'test2';
	$scope.domain = $location.host();
	$scope.recipes = [];
	$scope.loading = false;
	$scope.do = function() {
		$scope.loading = true;
		var beerxml = $scope.form.beerxml;
		var xmlRecipes = Brauhaus.Recipe.fromBeerXml(beerxml);
		var xmlRecipe = xmlRecipes[0];
		xmlRecipe.calculate();
		var timeline = xmlRecipe.timeline(false);
		var data = {
			data: xmlRecipe,
			timeline: timeline,
			general: {
				"color": xmlRecipe.color,
				"ibu": xmlRecipe.ibu,
				"og": xmlRecipe.og,
				"fg": xmlRecipe.fg,
				"abv": xmlRecipe.abv
				
			}
		}
		api.createItem('recipe', {data: data}).success(function(response){
			console.log(response);
			data.id = response.objectId;
			$location.path('/recipe/' + response.objectId);
			$scope.loading = false;
		});
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

app.controller('recipe', function($scope, $rootScope, $stateParams, api, $location) {
	var id = $stateParams.rid;
	$scope.loading = true;
	$scope.domain = $location.host();
	$rootScope.url = 'http://' + $scope.domain + '/recipe/' + id;
	$scope.rid = id;
	api.loadItem('recipe', id).success(function(data){
		console.log(data);
		$scope.recipe = data.data;
		$rootScope.siteTitle = $scope.recipe.data.name + ' | ' + 'BeerBin';
		$scope.loading = false;
	});
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