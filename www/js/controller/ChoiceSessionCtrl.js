(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ChoiceSessionCtrl
	 * Page : choice_session.html
	 * Goal : Managing Choice Session
	 */
	
	.controller('ChoiceSessionCtrl', ChoiceSessionCtrl);
	
	ChoiceSessionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService'];

	/* @ngInject */
	function ChoiceSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService) {

		var vm = this;
        
        vm.sessions = {}
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
		
        /*
         * Get Sessions
         */
        vm.getSessions = function() {
            pfLookUpService.getSessions()
            .then(function (result) {
            	console.log('getSessions return : ', result);
                vm.sessions = result.data.session;
            });
        }
        vm.getSessions();
        
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
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        
	}

})();