(function () {
    'use strict';

    angular.module('starter').factory('pfLookUpService', pfLookUpService);

    pfLookUpService.$inject = ['$http', '$q'];

    function pfLookUpService($http, $q) {
    	
        var service = {
        	getSessions: getSessions,
        };
        return service;

        // This function returns the Sessions json file
        function getSessions() {
            return $http.get('js/sessions/sessions.json');
        }
        
    }
})();
