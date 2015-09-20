(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER DisplayPrescriptionCtrl
	 * Page : display_prescription.html
	 * Goal : Managing displaying prescription
	 */
	
	.controller('DisplayPrescriptionCtrl', DisplayPrescriptionCtrl);
	
	DisplayPrescriptionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService'];

	/* @ngInject */
	function DisplayPrescriptionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService) {

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
                        console.log("Patient AntiRejects : ", vm.patient.listAntiReject);

                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        
	}

})();