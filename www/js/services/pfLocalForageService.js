(function () {
    'use strict';

    angular.module('starter').factory('pfLocalForageService', pfLocalForageService);

    pfLocalForageService.$inject = ['$http', '$q', '$rootScope', '$localForage', 'pfUtilsService'];

    function pfLocalForageService($http, $q, $rootScope, $localForage, pfUtilsService) {
    	
        var service = {
        	getListPatients : getListPatients,
        	insertNewPatient : insertNewPatient,
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
                
                // We add the statement to the list
                listPatients.push(
                    new Object({
                        "patient": dataToInsert
                    })
                );
                $localForage.setItem('listPatients', listPatients);
            })
        }
        
    }
})();
