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
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', '$localForage', '$ionicScrollDelegate'];

	/* @ngInject */
	function OtherPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService, $localForage,
                                   $ionicScrollDelegate) {

		var vm = this;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        // OtherPrescription
        vm.listOtherPrescription = [];
        vm.existingMedicine = true;
        
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
         * Get Other prescription
         */
        vm.getOtherPrescription = function() {
            pfLookUpService.getOtherPrescription()
            .then(function (result) {
                vm.existingMedicinePrescription = result.data.existingmedicine;
                console.log('getOtherPrescription return : ', vm.existingMedicinePrescription);
            });
        }
        vm.getOtherPrescription();

        /*
         * Get Dosage Times list
         */
        vm.listDosageTimes = pfUtilsService.getListDosageTimes();
        
        
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
            vm.newO = {};
            
            if(vm.existingMedicine){    // Existing medicine
                if (vm.newExistingMedicine !== undefined){
                    // We store all informations
                    vm.newO.existingMedicine = true;
                    vm.newO.medicine = vm.existingMedicinePrescription[vm.newExistingMedicine];
                    vm.newO.dosage = vm.existingMedicinePrescription[vm.newExistingMedicine].dosage;
                    vm.newO.frequence = vm.newExistingMedicineFrequence;
                }
            }
            else{
                if (vm.newOther !== undefined){
                    // We store all informations
                    vm.newO.existingMedicine = false;
                    vm.newO.medicine = vm.newOther;
                    vm.newO.dosage = vm.newOtherDosage;
                    vm.newO.frequence = vm.newOtherFrequence;
                }
            }
            
            vm.listOtherPrescription.push(
                new Object({
                    "other": vm.newO
                })
            );

            // we reinitialize content of inputs
            vm.newOther = undefined;
            vm.newOtherDosage = undefined;
            vm.newOtherFrequence = undefined;
            
            vm.newExistingMedicine = undefined;
            vm.getOtherPrescription();
            vm.newExistingMedicineFrequence = undefined;
            
            $ionicScrollDelegate.resize(); 
		}
        
        vm.removeOther = function(idToDelete) {
			vm.listOtherPrescription.splice(idToDelete, 1);
            
            $ionicScrollDelegate.resize(); 
		} 
        
        vm.editOther = function(idToEdit, object) {
        	// At first we remove it from the list
        	vm.listOtherPrescription.splice(idToEdit, 1);
        	
        	// Then we set the input with these values
        	vm.newOther = object.other.medicine;
            vm.newOtherDosage = object.other.dosage;
            vm.newOtherFrequence = object.other.frequence;
            
            $ionicScrollDelegate.resize(); 
		} 
        
        vm.reorderItem = function(other, fromIndex, toIndex) {
        	vm.listOtherPrescription.splice(fromIndex, 1);
        	vm.listOtherPrescription.splice(toIndex, 0, other);
        };
        
        vm.popupBack = function() {
            var params = { patientId: vm.patient.id};
        	pfUtilsService.popupBack('display_prescription', params);
        };
        
        vm.changeExistingMedicine = function() {
            $ionicScrollDelegate.resize();
        }
        
	}

})();