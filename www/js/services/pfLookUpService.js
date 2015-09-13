(function () {
    'use strict';

    angular.module('starter').factory('pfLookUpService', pfLookUpService);

    pfLookUpService.$inject = ['$http', '$q'];

    function pfLookUpService($http, $q) {
    	
        var service = {
        	getSessions: getSessions,
            getAntiRejectPrescription: getAntiRejectPrescription,
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
        
    }
})();
