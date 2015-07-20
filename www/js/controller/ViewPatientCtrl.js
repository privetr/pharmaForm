(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ViewPatientCtrl
	 * Page : view_patient.html
	 * Goal : Managing View and creation of patient
	 */
	
	.controller('ViewPatientCtrl', ViewPatientCtrl);
	
	ViewPatientCtrl.$inject = ['$state', '$scope',
		               ];

	/* @ngInject */
	function ViewPatientCtrl($state, $scope) {

		var vm = this;
	}

})();