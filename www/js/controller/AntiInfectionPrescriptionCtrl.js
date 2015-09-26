(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER AntiInfectionPrescriptionCtrl
	 * Page : antiinfection_prescription.html
	 * Goal : Managing anti infection prescription
	 */
	
	.controller('AntiInfectionPrescriptionCtrl', AntiInfectionPrescriptionCtrl);
	
	AntiInfectionPrescriptionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', '$localForage'];

	/* @ngInject */
	function AntiInfectionPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, 
                                         pfUtilsService, pfLookUpService, $localForage) {

		var vm = this;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        // AntiInfection
        vm.listAntiInfection = [];
        
        console.log('Patient id : ' + vm.patient.id);
        
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
                        if(vm.patient.listAntiInfection){
                            vm.listAntiInfection = vm.patient.listAntiInfection;
                        }
                        console.log("Patient : ", vm.patient);
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        /*
         * Get Anti infection prescription
         */
        vm.getAntiInfectionPrescription = function() {
            pfLookUpService.getAntiInfectionPrescription()
            .then(function (result) {
                vm.antiInfectionPrescription = result.data.antiinfection;
                console.log('getAntiInfectionPrescription return : ', vm.antiInfectionPrescription);
            });
        }
        vm.getAntiInfectionPrescription();
        
        /*
         * Get Frequences list
         */
        vm.getAntiInfectionListFrequence = function() {
            pfLookUpService.getFrequence()
            .then(function (result) {
                vm.antiInfectionListFrequence = result.data.frequence;
                console.log('getAntiInfectionListFrequence return : ', vm.antiInfectionListFrequence);
            });
        }
        vm.getAntiInfectionListFrequence();
        
        /*
         * Save AntiInfection
         */
        vm.saveAntiInfection = function() {
            
            // we set the new patient informations
            vm.listPatients[vm.patient.indexPatient].patient.listAntiInfection = vm.listAntiInfection;
            
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Traitements Anti-infectieux modifiés');
                $state.go('display_prescription', {patientId: vm.patient.id} );
            })
        }
        
        /*
         * ANTI INFECTIONS
         * Functions to manage anti-infections
         */
        vm.addAntiInfection = function() {
        	if (vm.antiInfectionPrescription[vm.newAntiInfection] !== undefined &&
                vm.newAntiInfectionDosage !== undefined &&
                vm.antiInfectionListFrequence[vm.newAntiInfectionFrequence] !== undefined){
                
                vm.newAR = {};

                // We store all informations
                vm.newAR.medicine = vm.antiInfectionPrescription[vm.newAntiInfection];
                vm.newAR.dosage = vm.newAntiInfectionDosage;
                vm.newAR.frequence = vm.antiInfectionListFrequence[vm.newAntiInfectionFrequence];
                
                vm.listAntiInfection.push(
                    new Object({
                        "antiinfection": vm.newAR
                    })
                );
                
                // we reinitialize content of inputs
                vm.newAntiInfection = undefined;
                vm.newAntiInfectionDosage = undefined;
                vm.newAntiInfectionFrequence = undefined;
        	}
		}
        
        vm.removeAntiInfection = function(idToDelete) {
			vm.listAntiInfection.splice(idToDelete, 1);
		} 
        
        vm.editAntiInfection = function(idToEdit, object) {
        	// At first we remove it from the list
        	vm.listAntiInfection.splice(idToEdit, 1);
        	
        	// Then we set the input with these values
        	vm.newAntiInfection = pfUtilsService.getIndexOf(vm.antiInfectionPrescription, object.antiinfection.medicine.id, 'id').toString();
            vm.newAntiInfectionDosage = object.antiinfection.dosage;
            vm.newAntiInfectionFrequence = 
                pfUtilsService.getIndexOf(vm.antiInfectionListFrequence, object.antiinfection.frequence.id, 'id').toString();
		} 
        
        vm.reorderItem = function(antiinfection, fromIndex, toIndex) {
        	vm.listAntiInfection.splice(fromIndex, 1);
        	vm.listAntiInfection.splice(toIndex, 0, antiinfection);
        };
        
	}

})();