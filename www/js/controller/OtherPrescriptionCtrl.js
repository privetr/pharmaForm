(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER OtherPrescriptionCtrl
	 * Page : other_prescription.html
	 * Goal : Managing other prescription
	 */
	
	.controller('OtherPrescriptionCtrl', OtherPrescriptionCtrl);
	
	OtherPrescriptionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', '$localForage'];

	/* @ngInject */
	function OtherPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService, $localForage) {

		var vm = this;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        // OtherPrescription
        vm.listOtherPrescription = [];
        
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
                        if(vm.patient.listOtherPrescription){
                            vm.listOtherPrescription = vm.patient.listOtherPrescription;
                        }
                        console.log("Patient : ", vm.patient);
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        /*
         * Save Other prescription
         */
        vm.saveOtherPrescription = function() {
            
            // we set the new patient informations
            vm.listPatients[vm.patient.indexPatient].patient.listOtherPrescription = vm.listOtherPrescription;
            
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Traitements associés modifiés');
                $state.go('display_prescription', {patientId: vm.patient.id} );
            })
        }
        
        /*
         * OTHER PRESCRIPTION
         * Functions to manage others medicines
         */
        vm.addOther = function() {
        	if (vm.newOther !== undefined &&
                vm.newOtherDosage !== undefined &&
                vm.newOtherFrequence !== undefined){
                
                vm.newO = {};

                // We store all informations
                vm.newO.medicine = vm.newOther;
                vm.newO.dosage = vm.newOtherDosage;
                vm.newO.frequence = vm.newOtherFrequence;
                
                vm.listOtherPrescription.push(
                    new Object({
                        "other": vm.newO
                    })
                );
                
                // we reinitialize content of inputs
                vm.newOther = undefined;
                vm.newOtherDosage = undefined;
                vm.newOtherFrequence = undefined;
        	}
		}
        
        vm.removeOther = function(idToDelete) {
			vm.listOtherPrescription.splice(idToDelete, 1);
		} 
        
        vm.editOther = function(idToEdit, object) {
        	// At first we remove it from the list
        	vm.listOtherPrescription.splice(idToEdit, 1);
        	
        	// Then we set the input with these values
        	vm.newOther = object.other.medicine;
            vm.newOtherDosage = object.other.dosage;
            vm.newOtherFrequence = object.other.frequence;
		} 
        
        vm.reorderItem = function(other, fromIndex, toIndex) {
        	vm.listOtherPrescription.splice(fromIndex, 1);
        	vm.listOtherPrescription.splice(toIndex, 0, other);
        };
        
	}

})();