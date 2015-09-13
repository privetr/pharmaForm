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
        
        // Initialize sort orderBy
        $scope.predicate = 'patient.creationDate';
        $scope.reverse = true;
        
        vm.listPatients = [];
        
        // We check if it is a creation of user or not
		
		/*
		 * Get Patients list
		 */		
		pfLocalForageService.getListPatients()
		.then (function(listPatients) {
			vm.listPatients = pfUtilsService.transformationToArray(listPatients);
			vm.nbPatients = vm.listPatients.length;
			console.log("Nombre de patients : " + vm.nbPatients);
		});
        
        vm.formatDate = function(input) {
			//input type : 2015-06-30T14:49:20Z
			// output type : dd/MM/yyyy HH:mm
			return input.substring(8,10) + "/" + input.substring(5,7) + "/" + input.substring(0,4) + " " + input.substring(11,16);
		}
        
	}

})();