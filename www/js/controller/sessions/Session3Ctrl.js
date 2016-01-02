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
                             '$ionicPopup', '$ionicLoading', '$localForage'];

	/* @ngInject */
	function Session3Ctrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        vm.listHours = {};
        
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
                    if(!_.contains(vm.listHours.listKey, frequence.id) && frequence.selected){
                        antiRejectHasHours = true;
                        
                        vm.listHours.listKey.push(frequence.id);
                        vm.listHours.values.push(frequence);
                        tmpFrequence.push(frequence);
                    }
                    else if(_.contains(vm.listHours.listKey, frequence.id) && frequence.selected){  
                        // If the frequence already exists, we also need to push the medicine
                        antiRejectHasHours = true;
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
                            "special": false,
                            "listHours": [],
                            "indication": "",
                            "comment": ""
                        }
                    );
                }
                
                antiRejectHasHours = false;
                tmpFrequence = []
                tmpDosage = []
            });
            
            var numMed = 0;
            
            // AntiInfection
            var antiInfectionHasHours = false;
            tmpFrequence = [];
            tmpDosage = [];
            
            angular.forEach(vm.patient.listAntiInfection, function(med) {   // Loop medicine
                angular.forEach(med.antiinfection.frequence, function(frequence) {  // Loop frequence
                    // We test if frequence is not yet in the array 
                    if(!_.contains(vm.listHours.listKey, frequence.id) && frequence.selected){
                        antiInfectionHasHours = true;
                        
                        vm.listHours.listKey.push(frequence.id);
                        vm.listHours.values.push(frequence);
                        tmpFrequence.push(frequence);
                    }
                    else if(_.contains(vm.listHours.listKey, frequence.id) && frequence.selected){  
                        // If the frequence already exists, we also need to push the medicine
                        antiInfectionHasHours = true;
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
                            "dosage": tmpDosage,
                            "listHours": [], 
                            "indication": "",
                            "comment": ""
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
                            "dosage": tmpDosage,
                            "indication": "",
                            "comment": ""
                        }
                    );
                }
                antiInfectionHasHours = false;
                tmpFrequence = [];
                tmpDosage = [];
            });
            
            // In the end we add frequences for each medicine
            // http://underscorejs.org/#sortBy
            vm.listHours.values = _.sortBy(vm.listHours.values, 'name');
            
            angular.forEach(vm.listHours.listMedicine, function(med) {  // Loop frequences
                angular.forEach(vm.listHours.values, function(frequence) {     // Loop frequence
                    if(med.listHours){
                        med.listHours.push(
                            {
                                id: frequence.id,
                                name: frequence.name,
                                class: 0,
                                answerPatient: false
                            }
                        )
                    }
                })
            });
            
            vm.listImages = [];
            // We store images to be able to shuffle it
            angular.forEach(vm.listHours.listMedicine, function(med) {
                vm.listImages.push(med);
                vm.listImages = _.shuffle(vm.listImages);
            });
            
            // Other prescription (médicaments associés)
            angular.forEach(vm.patient.listOtherPrescription, function(med) {  // Loop medicine
                
                vm.listHours.listMedicine.push(
                    {
                        "medicine": med,
                        "frequence": med.other.frequence,
                        "type": "other",
                        "dosage": med.other.dosage,
                        "special": true,
                        "listHours": [],
                        "indication": "",
                        "comment": ""
                    }
                );
            });
            
            console.log("Liste images", vm.listImages);
            
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
                          type: 'button-assertive button-clear',
                          onTap: function(e) {
                              vm.saveSession();
                          }
                      }
                ]
            });
     	};
        
        /*
    	 * Function to display a Pop-up to confirm we want to save the Session
    	 */
    	vm.answerPatientFrequenceChange = function(frequence, indexMed, indexFreq) {
            console.log(frequence, indexMed, indexFreq);

            var tmpBool = false;
            angular.forEach(vm.listHours.listMedicine[indexMed].frequence, function(f) {
                if(f.id === frequence.id){
                    tmpBool = true;
                }
            });
            
            if(!vm.listHours.listMedicine[indexMed].listHours[indexFreq].answerPatient) {   // If we unchecked the checkbox
                 vm.listHours.listMedicine[indexMed].listHours[indexFreq].class = 0;
            }
            else if(tmpBool) {   // Checkbox checked, right answer
                vm.listHours.listMedicine[indexMed].listHours[indexFreq].class = 1;
            }
            else {   // Checkbox checked, wrong answer
                vm.listHours.listMedicine[indexMed].listHours[indexFreq].class = -1;
            }
            
             console.log("Formatted medicine PDP : ", vm.listHours);
        }
        
        $scope.dropCallback = function(event, ui, med) {
            console.log('hey, you dumped me :-(', ui.helper[0].name);
            console.log('hey, you dumped me :-(', med);
            var rightAnswer = false;
            
            // We have to try if the image dropped corresponds to the medicine
            for(var i=0; i < med.dosage.length; i++){
                if(med.dosage[i].imagePath === ui.helper[0].name){
                    rightAnswer = true;
                    break;
                }
            }
            console.log(rightAnswer);
            if(rightAnswer){
                $( '#' + ui.helper[0].id ).removeClass( 'img-wrong' );
                $( '#' + ui.helper[0].id ).addClass( 'img-right' );
            }
            else{
                $( '#' + ui.helper[0].id ).removeClass( 'img-right' );
                $( '#' + ui.helper[0].id ).addClass( 'img-wrong' );
            }
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
            
            
            var tmpAlreadyDone = false;
            
            // We save session
            if (vm.patient.listSessionsOver !== undefined) {    // Some sessions have already been saved
                // We have to check if the current session has already been saved
                for (var i = 0 ; i < vm.patient.listSessionsOver.length ; i++) {
                    if (vm.patient.listSessionsOver[i] === vm.session.id) {
                        tmpAlreadyDone = true;
                        
                        // We have to delete the last version saved from vm.listSessionsOver
                        vm.patient.listSessionsOver.splice(i, 1);
                        vm.patient.listSessionsOver.push(vm.session.id);    // List of sessions over
                        
                        // We have to remove the previous answers from vm.patient.listSessionsAnswers
                        for (var j = 0 ; j < vm.patient.listSessionsAnswers.length ; j++) {
                            if (vm.patient.listSessionsAnswers[j].id === vm.session.id) {
                                vm.patient.listSessionsAnswers.splice(j, 1);
                                vm.patient.listSessionsAnswers.push(vm.session);
                                break;
                            }
                        }
                    }
                }
                
                // If tmpAlreadyDone is false, it means that this session has never been saved before
                if(!tmpAlreadyDone){
                    vm.patient.listSessionsOver.push(vm.session.id);
                    vm.patient.listSessionsAnswers.push(vm.session);
                }
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
    		$ionicLoading.show({
    			template: '<ion-spinner icon="android"></ion-spinner><br>Enregistrement...'
		    });
    	}
    	
    	function displayButtonSaveSession(){
    		$ionicLoading.hide();
    	}
        
        
        vm.popupBack = function() {
            var params = { patientId: vm.patient.id};
        	pfUtilsService.popupBack('choice_session', params);
        };
        
	}

})();