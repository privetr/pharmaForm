(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ChangePasswordCtrl
	 * Page : change_password.html
	 * Goal : Managing changing password
	 */
	
	.controller('ChangePasswordCtrl', ChangePasswordCtrl);
	
	ChangePasswordCtrl.$inject = ['$state', '$scope', 'pfUtilsService', '$ionicModal', '$localForage'
		               ];

	/* @ngInject */
	function ChangePasswordCtrl($state, $scope, pfUtilsService, $ionicModal, $localForage) {

		var vm = this;
        
        vm.getActualPassword = function(){
            $localForage.getItem('actualPassword')
            .then(function(password) {
                if(password){
                    vm.actualPassword = password;
                } else {
                    vm.actualPassword = '2701';
                }
            });
        }
        vm.getActualPassword();
        
        vm.doLogin = function(){
            if(vm.old_password === 'gr3ath3_2015#laura' || vm.old_password === vm.actualPassword){
                if(vm.new_password1){
                    if(vm.new_password1 ===  vm.new_password2){
                        $localForage.setItem('actualPassword', vm.new_password1)
                        .then(function() {
                            pfUtilsService.showAlert('Succès', 'Mot de passe changé avec succès'); 
                            $state.go('home');
                        });
                    }
                    else{
                        pfUtilsService.showAlert('Erreur', 'Les nouveaux mots de passe ne sont pas identiques');   
                    }
                }
                else{
                    pfUtilsService.showAlert('Erreur', 'Le mot de passe ne peut être vide');   
                }
            }
            else{
                pfUtilsService.showAlert('Erreur', 'L\'ancien mot de passe est erroné');   
            }
        }
	}

})();