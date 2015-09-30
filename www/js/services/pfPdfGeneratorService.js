(function () {
    'use strict';

    angular.module('starter').factory('pfPdfGeneratorService', pfPdfGeneratorService);

    pfPdfGeneratorService.$inject = ['$http', '$q', '$rootScope'];

    function pfPdfGeneratorService($http, $q, $rootScope) {
    	
        var service = {
        	generatePdfSession1: generatePdfSession1
        };
        return service;

        // This function generates PDF for session 1
        function generatePdfSession1(patient) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            return doc.output('datauristring');
        }
        
        

    }
})();
