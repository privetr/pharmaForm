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
                        vm.patient.indexPatient = i;
                        vm.patient.lastname = vm.listPatients[i].patient.lastname;
                        vm.patient.firstname = vm.listPatients[i].patient.firstname;
                        vm.patient.birthdate = vm.listPatients[i].patient.birthdate;
                        vm.patient.graftdate = vm.listPatients[i].patient.graftdate;
                        vm.patient.listComments = vm.listPatients[i].patient.listComments;
                        vm.patient.listSessionsOver = vm.listPatients[i].patient.listSessionsOver;
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
        
        
	}

})();