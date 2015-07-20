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
		               ];

	/* @ngInject */
	function ListPatientsCtrl($state, $scope) {

		var vm = this;
	}

})();