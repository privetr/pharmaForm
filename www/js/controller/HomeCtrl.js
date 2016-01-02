(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER HomeCtrl
	 * Page : home.html
	 * Goal : Managing home
	 */
	
	.controller('HomeCtrl', HomeCtrl);
	
	HomeCtrl.$inject = ['$state', '$scope', 'pfUtilsService', '$ionicModal', '$localForage'
		               ];

	/* @ngInject */
	function HomeCtrl($state, $scope, pfUtilsService, $ionicModal, $localForage) {

		var vm = this;
        
        vm.displayGif = true;
        
        vm.getActualPassword = function(){
            $localForage.getItem('actualPassword')
            .then(function(password) {
                if(password){
                    vm.actualPassword = password;
                } else {
                    vm.actualPassword = '2701';     // First use of the application
                }
            });
        }
        vm.getActualPassword();
        
        
        // we hide bottom menu tabs at the moment
	    document.getElementById("bottom_tabs_app").style.visibility = "hidden" ;
        
        vm.doLogin = function(){
            if(vm.password === 'gr3ath3_2015#laura' || vm.password === vm.actualPassword){
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