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
                               'pfLocalForageService', 'pfUtilsService'
		               ];

	/* @ngInject */
	function ViewPatientCtrl($state, $scope, pfLocalForageService, pfUtilsService) {

		var vm = this;        
        
        vm.showDelete = false;
        vm.showReorder = false;
        
        // Date of the day
        var now = new Date();
        vm.dateNow = new Date(now.getFullYear(), now.getMonth() , now.getDate());
        
        // Comments
        vm.listComments = [];

        
        /*
         * SAVE PATIENTS
         */
        vm.savePatient = function() {
        	vm.patient = {};

            // We store all informations
            vm.patient.lastname = vm.lastname;
            vm.patient.firstname = vm.firstname;
            vm.patient.birthdate = vm.birthdate;
            vm.patient.graftdate = vm.graftdate;
            vm.patient.listComments = vm.listComments;
            
            pfLocalForageService.insertNewPatient(vm.patient)
            .then(function() {
                pfUtilsService.showAlert('Sauvegarde réussie', 'Informations du patient enregistrées');
                $state.go('list_patients');
            })
		}
        
        
        /*
         * COMMENTS
         * Functions to manage comments
         */
        vm.addComment = function(comment) {
        	if (comment !== undefined){
        		vm.listComments.push(
                    new Object({
                		"text": comment
                	})
                );
        		
                // we remove content of input
                vm.new_comment = undefined;
        	}
		}
        
        vm.removeComment = function(idToDelete) {
			vm.listComments.splice(idToDelete, 1);
		} 
        
        vm.editComment = function(idToEdit, comment) {
        	// At first we remove it from the list
        	vm.listComments.splice(idToEdit, 1);
        	
        	// Then we set the input with these values
        	vm.new_comment = comment.text;
		} 
        
        vm.reorderItem = function(comment, fromIndex, toIndex) {
        	vm.listComments.splice(fromIndex, 1);
        	vm.listComments.splice(toIndex, 0, comment);
        };
	}

})();