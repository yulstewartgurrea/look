var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/404");

	$stateProvider

		.state('landingpage', {
			url: "",
			templateUrl: ""
		})



});

