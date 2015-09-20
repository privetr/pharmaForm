(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER NewSessionCtrl
	 * Page : new_session.html
	 * Goal : Managing new Session
	 */
	
	.controller('NewSessionCtrl', NewSessionCtrl);
	
	NewSessionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService',
                             '$ionicPopup', '$ionicLoading', '$localForage'];

	/* @ngInject */
	function NewSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
		
        /*
         * Get Session
         */
        vm.getSession = function() {
            pfLookUpService.getSessions()
            .then(function (result) {
            	console.log('getSessions return : ', result);
                vm.sessions = result.data.session;
            });
        }
        vm.getSession();
        
		/*
		 * Get Patient
		 */		
		vm.getPatient = function() {

            pfLocalForageService.getListPatients()
            .then (function(listPatients) {
                vm.listPatients = pfUtilsService.transformationToArray(listPatients);
                for (var i = 0 ; i < vm.listPatients.length ; i++) {
                    if (vm.listPatients[i].patient.guid === vm.patient.id) {
                        vm.patient = vm.listPatients[i].patient;
                        vm.patient.id = $stateParams.patientId;
                        vm.patient.indexPatient = i;
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        
        /*
    	 * Function to display a Pop-up to confirm we want to save the Session
    	 */
    	vm.popupSaveSession = function() {
            var myPopup = $ionicPopup.show ({
                template: 'Etes-vous sûr de vouloir terminer la séance ?',
                title: 'Enregistrer séance',
                scope: $scope,
                buttons: [
                      { text: 'Annuler' },
                      {
                          text: '<b>Enregistrer</b>',
                          type: 'button-energized',
                          onTap: function(e) {
                              vm.saveSession();
                          }
                      }
                ]
            });
     	};
        
        
        /*
		 * SAVE SESSION
		 * Function to save a Session
		 */
		vm.saveSession = function (){
            // We unshow the button to save Session to avoid multiple send and we display a dialog alert
            hideButtonSaveSession();
            
            // We have to get patients at first
            pfLocalForageService.getListPatients()
            .then (function(listPatients) {
                vm.listPatients = pfUtilsService.transformationToArray(listPatients);
                
                // We save session
                if (vm.patient.listSessionsOver !== undefined) {
                    vm.patient.listSessionsOver.push(vm.session.id);
                }
                else {
                    vm.patient.listSessionsOver = [];
                    vm.patient.listSessionsOver.push(vm.session.id);
                }
                
                vm.listPatients[vm.patient.indexPatient].patient.listSessionsOver = vm.patient.listSessionsOver;
                
                return $localForage.setItem('listPatients', vm.listPatients)
                
                
            })
            .then(function() {
                pfUtilsService.showAlert('Séance terminée', 'La séance est désormais terminée, félicitations');
                $state.go('choice_session', {patientId: vm.patient.id} );
            })
            
            
            displayButtonSaveSession();
        }
        
        
        /*
     	 * UI BUTTONS
     	 * Function to process with waiting time when saving a new Session
     	 */
    	function hideButtonSaveSession(){
    		$( "#button_save_session" ).toggle( "fast", function() {
				// Animation complete
			});
    		$ionicLoading.show({
    			template: '<ion-spinner icon="android"></ion-spinner><br>Enregistrement...'
		    });
    	}
    	
    	function displayButtonSaveSession(){
    		$( "#button_save_session" ).toggle( "fast", function() {
				// Animation complete
			});
    		$ionicLoading.hide();
    	}
        
        
	}

})();