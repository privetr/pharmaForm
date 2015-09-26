(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER AntiRejectPrescriptionCtrl
	 * Page : antireject_prescription.html
	 * Goal : Managing anti reject prescription
	 */
	
	.controller('AntiRejectPrescriptionCtrl', AntiRejectPrescriptionCtrl);
	
	AntiRejectPrescriptionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', '$localForage'];

	/* @ngInject */
	function AntiRejectPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, 
                                         pfUtilsService, pfLookUpService, $localForage) {

		var vm = this;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        // AntiRejects
        vm.listAntiReject = [];
        
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
                        if(vm.patient.listAntiReject){
                            vm.listAntiReject = vm.patient.listAntiReject;
                        }
                        console.log("Patient : ", vm.patient);
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        /*
         * Get Anti reject prescription
         */
        vm.getAntiRejectPrescription = function() {
            pfLookUpService.getAntiRejectPrescription()
            .then(function (result) {
                vm.antiRejectPrescription = result.data.antireject;
                console.log('getAntiRejectPrescription return : ', vm.antiRejectPrescription);
            });
        }
        vm.getAntiRejectPrescription();
        
        /*
         * Get Frequences list
         */
        vm.getAntiRejectListFrequence = function() {
            pfLookUpService.getFrequence()
            .then(function (result) {
                vm.antiRejectListFrequence = result.data.frequence;
                console.log('getAntiRejectListFrequence return : ', vm.antiRejectListFrequence);
            });
        }
        vm.getAntiRejectListFrequence();
        
        /*
         * Save AntiReject
         */
        vm.saveAntiReject = function() {
            
            // we set the new patient informations
            vm.listPatients[vm.patient.indexPatient].patient.listAntiReject = vm.listAntiReject;
            
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Traitements Anti-rejets modifiés');
                $state.go('display_prescription', {patientId: vm.patient.id} );
            })
        }
        
        /*
         * ANTI REJECTS
         * Functions to manage anti-rejects
         */
        vm.addAntiReject = function() {
        	if (vm.antiRejectPrescription[vm.newAntiReject] !== undefined &&
                vm.newAntiRejectDosage !== undefined &&
                vm.antiRejectListFrequence[vm.newAntiRejectFrequence] !== undefined){
                
                vm.newAR = {};

                // We store all informations
                vm.newAR.medicine = vm.antiRejectPrescription[vm.newAntiReject];
                vm.newAR.dosage = vm.newAntiRejectDosage;
                vm.newAR.frequence = vm.antiRejectListFrequence[vm.newAntiRejectFrequence];
                
                vm.listAntiReject.push(
                    new Object({
                        "antireject": vm.newAR
                    })
                );
                
                // we reinitialize content of inputs
                vm.newAntiReject = undefined;
                vm.newAntiRejectDosage = undefined;
                vm.newAntiRejectFrequence = undefined;
        	}
		}
        
        vm.removeAntiReject = function(idToDelete) {
			vm.listAntiReject.splice(idToDelete, 1);
		} 
        
        vm.editAntiReject = function(idToEdit, object) {
        	// At first we remove it from the list
        	vm.listAntiReject.splice(idToEdit, 1);
        	
        	// Then we set the input with these values
            //alert(vm.getIndexOf(vm.antiRejectPrescription, object.antireject.medicine.id));
        	vm.newAntiReject = pfUtilsService.getIndexOf(vm.antiRejectPrescription, object.antireject.medicine.id, 'id').toString();
            vm.newAntiRejectDosage = object.antireject.dosage;
            vm.newAntiRejectFrequence = pfUtilsService.getIndexOf(vm.antiRejectListFrequence, object.antireject.frequence.id, 'id').toString();
		} 
        
        vm.reorderItem = function(antireject, fromIndex, toIndex) {
        	vm.listAntiReject.splice(fromIndex, 1);
        	vm.listAntiReject.splice(toIndex, 0, antireject);
        };

	}

})();