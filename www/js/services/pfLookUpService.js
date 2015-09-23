(function () {
    'use strict';

    angular.module('starter').factory('pfLookUpService', pfLookUpService);

    pfLookUpService.$inject = ['$http', '$q'];

    function pfLookUpService($http, $q) {
    	
        var service = {
        	getSessions: getSessions,
            getAntiRejectPrescription: getAntiRejectPrescription,
            getAntiInfectionPrescription: getAntiInfectionPrescription,
            getFrequence: getFrequence
        };
        return service;

        // This function returns the Sessions json file
        function getSessions() {
            return $http.get('js/sessions/sessions.json');
        }
        
        // This function returns the Anti Reject Prescription json file
        function getAntiRejectPrescription() {
            return $http.get('js/sessions/antireject.json');
        }
        
        // This function returns the Anti Infection Prescription json file
        function getAntiInfectionPrescription() {
            return $http.get('js/sessions/antiinfection.json');
        }
        
        // This function returns the frequence json file
        function getFrequence() {
            return $http.get('js/sessions/frequence.json');
        }
        
    }
})();
