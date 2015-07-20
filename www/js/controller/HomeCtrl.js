(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER HomeCtrl
	 * Page : home.html
	 * Goal : Managing home
	 */
	
	.controller('HomeCtrl', HomeCtrl);
	
	HomeCtrl.$inject = ['$state', '$scope',
		               ];

	/* @ngInject */
	function HomeCtrl($state, $scope) {

		var vm = this;
	}

})();