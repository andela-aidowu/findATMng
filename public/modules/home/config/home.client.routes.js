'use strict';

// Setting up route
angular.module('home').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('homes', {
			url: '/home',
			templateUrl: 'modules/home/views/home.client.view.html'
		});
	}
]);