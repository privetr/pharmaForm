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
                             '$ionicPopup', '$ionicLoading'];

	/* @ngInject */
	function NewSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading) {

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
                        vm.patient.indexPatient = i;
                        vm.patient.lastname = vm.listPatients[i].patient.lastname;
                        vm.patient.firstname = vm.listPatients[i].patient.firstname;
                        vm.patient.birthdate = vm.listPatients[i].patient.birthdate;
                        vm.patient.graftdate = vm.listPatients[i].patient.graftdate;
                        vm.patient.listComments = vm.listPatients[i].patient.listComments;
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
            
            // TODO Save Session
            
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