(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER MainMenuCtrl
	 * Page : main_menu.html
	 * Goal : Managing main menu
	 */
	
	.controller('MainMenuCtrl', MainMenuCtrl);
	
	MainMenuCtrl.$inject = ['$state', '$scope', 'pfUtilsService'
		               ];

	/* @ngInject */
	function MainMenuCtrl($state, $scope, pfUtilsService) {

		var vm = this;
        
	}

})();