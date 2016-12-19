var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

	$stateProvider

		.state('home', {
			url:'/home',
			templateUrl: 'partials/sample-home.html'
		})

		// nested list with custom controller
		.state('home.list', {
        url: '/list',
        templateUrl: 'partials/sample-list.html',
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
            '': { templateUrl: 'partials/sample-about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: 'partials/sample-table.html',
                controller: 'scotchController'
            }
        }
        
    });

}); // closes $routerApp.config()


