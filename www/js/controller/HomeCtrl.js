(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER HomeCtrl
	 * Page : home.html
	 * Goal : Managing home
	 */
	
	.controller('HomeCtrl', HomeCtrl);
	
	HomeCtrl.$inject = ['$state', '$scope', 'pfUtilsService', '$ionicModal'
		               ];

	/* @ngInject */
	function HomeCtrl($state, $scope, pfUtilsService, $ionicModal) {

		var vm = this;
        
        vm.displayGif = true;
        
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
        
        vm.openModalPurpose = function() {
            $ionicModal.fromTemplateUrl('templates/modals/modalPurpose.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalPurpose = modal;
                $scope.modalPurpose.show();
            });
        }
	}

})();