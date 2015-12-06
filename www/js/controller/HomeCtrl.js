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
        
        // we hide bottom menu tabs at the moment
	    document.getElementById("bottom_tabs_app").style.visibility = "hidden" ;
        
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