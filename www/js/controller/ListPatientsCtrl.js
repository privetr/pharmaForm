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
                                'pfLocalForageService', 'pfUtilsService', '$ionicPopup', '$localForage'];

	/* @ngInject */
	function ListPatientsCtrl($state, $scope, pfLocalForageService, pfUtilsService, $ionicPopup, $localForage) {

		var vm = this;
        
        // we hide bottom menu tabs at the moment
	    document.getElementById("bottom_tabs_app").style.visibility="visible" ;
        
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
            console.log("Liste patients : ", vm.listPatients);
		});
        
        vm.formatDate = function(input) {
			//input type : 2015-06-30T14:49:20Z
			// output type : dd/MM/yyyy HH:mm
			return input.substring(8,10) + "/" + input.substring(5,7) + "/" + input.substring(0,4) + " " + input.substring(11,16);
		}
        
        vm.deletePatient = function(patientToDelete) {
            var idToDelete = 0;
            
            var myPopup = $ionicPopup.show ({
                template: '<em class="item-center item-text-wrap">Etes-vous sûr de vouloir supprimer définitivement le patient ?</em>',
                title: 'Supprimer ' + patientToDelete.patient.firstname + " " + patientToDelete.patient.lastname + " ?",
                buttons: [
                      {
                          text: 'Annuler',
                          type: 'button-clear button-stable'
                      },
                      {
                          text: '<b>Continuer</b>',
                          type: 'button-energized button-clear',
                          onTap: function(e) {
                              // We search for the patient to delete
                              vm.listPatients = _.reject(vm.listPatients, function(item){ 
                                  return item.patient.guid === patientToDelete.patient.guid; 
                              });
                              
                              $localForage.setItem('listPatients', vm.listPatients)
                              .then(function() {
                                    pfUtilsService.showAlert('Suppression réussie', 'Le patient a été supprimé');
                              })
                          }
                      }
                ]
            });
            
		} 
	}

})();