(function () {
    'use strict';

    angular.module('starter').factory('pfLocalForageService', pfLocalForageService);

    pfLocalForageService.$inject = ['$http', '$q', '$rootScope', '$localForage', 'pfUtilsService'];

    function pfLocalForageService($http, $q, $rootScope, $localForage, pfUtilsService) {
    	
        var service = {
        	getListPatients : getListPatients,
        	insertNewPatient : insertNewPatient,
            insertNewAntiReject : insertNewAntiReject,
            insertNewAntiInfection : insertNewAntiInfection
        }; 

        return service;

        /*
         * STATEMENTS
         */
        
        // Function which returns listStatement in local Database
        function getListPatients() {
        	var listPatients = [];
            
        	return $localForage.getItem('listPatients')
        	.then(function(list) {
                if(list !== null) listPatients = list;
                
                return pfUtilsService.transformationToArray(listPatients);
            })
        }

        // Function which inserts a new patient in listPatients in local database
        function insertNewPatient(dataToInsert) {
        	var listPatients = [];
        	
        	return $localForage.getItem('listPatients')
     		.then(function(list) {
                if(list !== null) listPatients = list;
                
                // We set a guid for the new statement
                dataToInsert.guid = "patient_" + Math.floor(Date.now() / 1000);
                console.log('New patient created with ID : ', dataToInsert.guid);
                
                // We add the statement to the list
                listPatients.push(
                    new Object({
                        "patient": dataToInsert
                    })
                );
                return $localForage.setItem('listPatients', listPatients);
            })
        }
        
        // Function which inserts a new anti reject for a patient local database
        function insertNewAntiReject(patient, dataToInsert) {
        	var listPatients = [];
        	
        	return $localForage.getItem('listPatients')
     		.then(function(list) {
                if(list !== null) listPatients = list;
                
                // We test if the list of anti rejects is empty or not
                if(listPatients[patient.indexPatient].patient.listAntiReject === undefined){
                    listPatients[patient.indexPatient].patient.listAntiReject = [];
                }
                
                // We add the anti reject to the list
                listPatients[patient.indexPatient].patient.listAntiReject.push(
                    new Object({
                        "antireject": dataToInsert
                    })
                );
                return $localForage.setItem('listPatients', listPatients);
            })
        }
        
        // Function which inserts a new anti infection for a patient local database
        function insertNewAntiInfection(patient, dataToInsert) {
        	var listPatients = [];
        	
        	return $localForage.getItem('listPatients')
     		.then(function(list) {
                if(list !== null) listPatients = list;
                
                // We test if the list of anti infection is empty or not
                if(listPatients[patient.indexPatient].patient.listAntiInfection === undefined){
                    listPatients[patient.indexPatient].patient.listAntiInfection = [];
                }
                
                // We add the anti infection to the list
                listPatients[patient.indexPatient].patient.listAntiInfection.push(
                    new Object({
                        "antiinfection": dataToInsert
                    })
                );
                return $localForage.setItem('listPatients', listPatients);
            })
        }
        
    }
})();
