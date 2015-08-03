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
                               'pfLocalForageService', 'pfUtilsService', '$stateParams',
                               '$localForage'
		               ];

	/* @ngInject */
	function ViewPatientCtrl($state, $scope, pfLocalForageService, pfUtilsService, $stateParams, $localForage) {

		var vm = this;        
        
        vm.showDelete = false;
        vm.showReorder = false;
        
        vm.patientId = $stateParams.patientId;
        
        vm.loadPatient = function() {
            if(vm.patientId !== '-1'){
                vm.isNewPatient = false;
                vm.edition = false;
                
                pfLocalForageService.getListPatients()
                .then (function(listPatients) {
                    vm.listPatients = pfUtilsService.transformationToArray(listPatients);
                    for (var i = 0 ; i < vm.listPatients.length ; i++) {
                        if (vm.listPatients[i].patient.guid === vm.patientId) {
                            vm.indexExistingPatient = i;
                            vm.lastname = vm.listPatients[i].patient.lastname;
                            vm.firstname = vm.listPatients[i].patient.firstname;
                            vm.birthdate = vm.listPatients[i].patient.birthdate;
                            vm.graftdate = vm.listPatients[i].patient.graftdate;
                            vm.listComments = vm.listPatients[i].patient.listComments;
                            break;
                        }
                    }
                });
            }
            else {
                vm.isNewPatient = true;
                vm.edition = true;
            }
		} 
        vm.loadPatient();
        
        // Date of the day
        var now = new Date();
        vm.dateNow = new Date(now.getFullYear(), now.getMonth() , now.getDate());
        
        // Comments
        vm.listComments = [];

        
        /*
         * SAVE PATIENTS
         */
        vm.savePatient = function() {
            
            if(vm.isNewPatient){
                vm.new_patient = {};

                // We store all informations
                vm.new_patient.lastname = vm.lastname;
                vm.new_patient.firstname = vm.firstname;
                vm.new_patient.birthdate = vm.birthdate;
                vm.new_patient.graftdate = vm.graftdate;
                vm.new_patient.listComments = vm.listComments;

                pfLocalForageService.insertNewPatient(vm.new_patient)
                .then(function() {
                    pfUtilsService.showAlert('Sauvegarde réussie', 'Informations du patient enregistrées');
                    $state.go('home');
                })
            }
            else {
                vm.listPatients[vm.indexExistingPatient].patient.lastname = vm.lastname;
                vm.listPatients[vm.indexExistingPatient].patient.firstname = vm.firstname;
                vm.listPatients[vm.indexExistingPatient].patient.birthdate = vm.birthdate;
                vm.listPatients[vm.indexExistingPatient].patient.graftdate = vm.graftdate;
                vm.listPatients[vm.indexExistingPatient].patient.listComments = vm.listComments;
                
                $localForage.setItem('listPatients', vm.listPatients)
                .then(function() {
                    pfUtilsService.showAlert('Sauvegarde réussie', 'Informations du patient enregistrées');
                    vm.edition = false;
                })
            }
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