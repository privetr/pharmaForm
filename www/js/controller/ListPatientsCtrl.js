(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ListPatientsCtrl
	 * Page : list_patients.html
	 * Goal : Managing List Patients
	 */
	
	.controller('ListPatientsCtrl', ListPatientsCtrl);
	
	ListPatientsCtrl.$inject = ['$state', '$scope',
                                'pfLocalForageService', 'pfUtilsService'];

	/* @ngInject */
	function ListPatientsCtrl($state, $scope, pfLocalForageService, pfUtilsService) {

		var vm = this;
        
        vm.listPatients = [];
		
		/*
		 * Get Patients list
		 */		
		pfLocalForageService.getListPatients()
		.then (function(listPatients) {
			vm.listPatients = pfUtilsService.transformationToArray(listPatients);
			vm.nbPatients = vm.listPatients.length;
			console.log("Nombre de patients : " + vm.nbPatients);
		});
        
	}

})();