// var myApp = angular.module('myApp', ['ui.router']);

// myApp.config(function ($stateProvider, $urlRouterProvider){

// 	// $urlRouterProvider.otherwise("/404");

// 	$stateProvider
// 		.state('home', {
// 			url: "/home",
// 			templateUrl: "templates/home,html"
// 		})
// 		.state('list', {

// 		})



// });

var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

	$stateProvider

		.state('home', {
			url:'/home',
			templateUrl: 'static/partials/sample-home.html'
		})

		// nested list with custom controller
		.state('home.list', {
        url: '/list',
        templateUrl: 'static/partials/sample-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        	}
    	})

    	// nested list with just some random string data
    	.state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    	})

    	.state('about', {
        url: '/about',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'static/partials/sample-about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: 'static/partials/sample-table.html',
                controller: 'scotchController'
            }
        }
        
    });

}); // closes $routerApp.config()


// let's define the scotch controller that we call up in the about state
// myApp.controller('scotchController', function($scope) {
    
//     $scope.message = 'test';
   
//     $scope.scotches = [
//         {
//             name: 'Macallan 12',
//             price: 50
//         },
//         {
//             name: 'Chivas Regal Royal Salute',
//             price: 10000
//         },
//         {
//             name: 'Glenfiddich 1937',
//             price: 20000
//         }
//     ];
    
// });


