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
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService'];

	/* @ngInject */
	function AntiInfectionPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService) {

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
        vm.antiInfectionListFrequence = pfUtilsService.getListFrequence();
        
        /*
         * Save AntiInfection
         */
        vm.saveAntiInfection = function() {
            vm.newAI = {};

            // We store all informations
            vm.newAI.medicine = vm.antiInfectionPrescription[vm.newAntiInfection];
            vm.newAI.dosage = vm.newAntiInfectionDosage;
            vm.newAI.frequence = vm.antiInfectionListFrequence[vm.newAntiInfectionFrequence];

            pfLocalForageService.insertNewAntiInfection(vm.patient, vm.newAI)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Anti-infectieux ajouté');
                $state.go('display_prescription', {patientId: vm.patient.id} );
            })
        }
        
        
	}

})();