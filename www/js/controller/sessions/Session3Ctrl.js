(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER Session3Ctrl
	 * Page : seance_3.html
	 * Goal : Managing seance 3
	 */

	.controller('Session3Ctrl', Session3Ctrl);
	
	Session3Ctrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService',
                             '$ionicPopup', '$ionicLoading', '$localForage', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function Session3Ctrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage, $ionicSlideBoxDelegate) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        vm.listHours = [];
        
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
                console.log("Patient : ", vm.patient);
                
                // We have to get main informations for PDP
                vm.getHoursMedecine();
            });
		} 
        vm.getPatient();
        
        /*
         * Get Hours to take medicine
         */
        vm.getHoursMedecine = function() {
            vm.listHours.listKey = [];
            vm.listHours.values = [];
            vm.listHours.listMedicine = [];
            
            // AntiRejects
            var antiRejectHasHours = false;
            var tmpFrequence = [];
            var tmpDosage = []
            
            angular.forEach(vm.patient.listAntiReject, function(med) {  // Loop medicine
                angular.forEach(med.antireject.frequence, function(frequence) {     // Loop frequence
                    // We test if frequence is not yet in the array 
                    if(!pfUtilsService.getIndexOfInList(vm.listHours.listKey, frequence.id) && frequence.selected){
                        antiRejectHasHours = true;
                        
                        vm.listHours.listKey.push(frequence.id);
                        vm.listHours.values.push(frequence);
                        tmpFrequence.push(frequence);
                    }
                })
                
                // We have to look for dosages
                angular.forEach(med.antireject.dosage, function(dosage) {     // Loop dosage
                    if(dosage.selected){
                        tmpDosage.push(dosage);
                    }
                })
                
                if(antiRejectHasHours){
                    vm.listHours.listMedicine.push(
                        {
                            "medicine": med,
                            "frequence": tmpFrequence,
                            "type": "antireject",
                            "dosage": tmpDosage,
                            "special": false
                        }
                    );
                }
                antiRejectHasHours = false;
                tmpFrequence = []
                tmpDosage = []
            });
            
            // AntiInfection
            var antiInfectionHasHours = false;
            tmpFrequence = [];
            tmpDosage = [];
            
            angular.forEach(vm.patient.listAntiInfection, function(med) {   // Loop medicine
                angular.forEach(med.antiinfection.frequence, function(frequence) {  // Loop frequence
                    // We test if frequence is not yet in the array 
                    if(!pfUtilsService.getIndexOfInList(vm.listHours.listKey, frequence.id) && frequence.selected){
                        antiInfectionHasHours = true;
                        
                        vm.listHours.listKey.push(frequence.id);
                        vm.listHours.values.push(frequence);
                        tmpFrequence.push(frequence);
                    }
                })
                
                // We have to look for dosages
                angular.forEach(med.antiinfection.dosage, function(dosage) {     // Loop dosage
                    if(dosage.selected){
                        tmpDosage.push(dosage);
                    }
                })
                
                if(antiInfectionHasHours){
                    vm.listHours.listMedicine.push(
                        {
                            "medicine": med,
                            "frequence": tmpFrequence,
                            "type": "antiinfection",
                            "special": false,
                            "dosage": tmpDosage
                        }
                    );
                }
                else{
                    vm.listHours.listMedicine.push(
                        {
                            "medicine": med,
                            "frequence": med.antiinfection.dosage,
                            "type": "antiinfection",
                            "special": true,
                            "dosage": tmpDosage
                        }
                    );
                }
                antiInfectionHasHours = false;
                tmpFrequence = [];
                tmpDosage = [];
            });
            console.log("Formatted medicine PDP : ", vm.listHours);
                
        }

        
        /*
    	 * Function to display a Pop-up to confirm we want to save the Session
    	 */
    	vm.popupSaveSession = function() {
            var myPopup = $ionicPopup.show ({
                template: '<em class="item-center item-text-wrap">Etes-vous sûr de vouloir terminer la séance ?</em>',
                title: 'Enregistrer séance',
                scope: $scope,
                buttons: [
                      {
                          text: 'Annuler',
                          type: 'button-stable button-clear'
                      },
                      {
                          text: '<b>Enregistrer</b>',
                          type: 'button-energized button-clear',
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
            
            // we have to save all answers for Session 1
            vm.session.answer = {};
            // Slide1
            
            
            // We save session
            if (vm.patient.listSessionsOver !== undefined) {    // Some sessions have already been saved
                vm.patient.listSessionsOver.push(vm.session.id);    // List of sessions over
                vm.patient.listSessionsAnswers.push(vm.session);
            }
            else {  // None session has already been saved
                vm.patient.listSessionsOver = [];   // List of sessions over
                vm.patient.listSessionsOver.push(vm.session.id);
                
                vm.patient.listSessionsAnswers = [];    // List of session answers
                vm.patient.listSessionsAnswers.push(vm.session);
            }

            vm.listPatients[vm.patient.indexPatient].patient.listSessionsOver = vm.patient.listSessionsOver;      
            vm.listPatients[vm.patient.indexPatient].patient.listSessionsAnswers = vm.patient.listSessionsAnswers; 
                
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Séance 3 terminée', 'La séance 3 est désormais terminée, Félicitations !');
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
        
        /*
		 * SLIDERS
		 * Functions to manage sliding mode
		 */
		vm.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		vm.previousSlide = function() {
			$ionicSlideBoxDelegate.previous();
		}  	
        
        vm.popupBack = function() {
            var params = { patientId: vm.patient.id};
        	pfUtilsService.popupBack('choice_session', params);
        };
        
	}

})();