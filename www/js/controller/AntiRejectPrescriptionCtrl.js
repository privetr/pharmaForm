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
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService'];

	/* @ngInject */
	function AntiRejectPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService) {

		var vm = this;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
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
        vm.antiRejectListFrequence = pfUtilsService.getListFrequence();
        
        /*
         * Save AntiReject
         */
        vm.saveAntiReject = function() {
            vm.newAR = {};

            // We store all informations
            vm.newAR.medicine = vm.antiRejectPrescription[vm.newAntiReject];
            vm.newAR.dosage = vm.newAntiRejectDosage;
            vm.newAR.frequence = vm.antiRejectListFrequence[vm.newAntiRejectFrequence];

            pfLocalForageService.insertNewAntiReject(vm.patient, vm.newAR)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Anti-rejet ajouté');
                $state.go('display_prescription', {patientId: vm.patient.id} );
            })
        }
        
        
	}

})();