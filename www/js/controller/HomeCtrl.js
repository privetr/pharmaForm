(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER HomeCtrl
	 * Page : home.html
	 * Goal : Managing home
	 */
	
	.controller('HomeCtrl', HomeCtrl);
	
	HomeCtrl.$inject = ['$state', '$scope', 'pfUtilsService'
		               ];

	/* @ngInject */
	function HomeCtrl($state, $scope, pfUtilsService) {

		var vm = this;
        
        vm.doLogin = function(){
            if(vm.password === '2701'){
                $state.go('list_patients');
            }
            else{
                pfUtilsService.showAlert('Erreur', 'Le mot de passe est erroné');   
            }
        }
	}

})();