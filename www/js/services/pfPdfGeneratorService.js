(function () {
    'use strict';

    angular.module('starter').factory('pfPdfGeneratorService', pfPdfGeneratorService);

    pfPdfGeneratorService.$inject = ['$http', '$q', '$rootScope'];

    function pfPdfGeneratorService($http, $q, $rootScope) {
    	
        var service = {
        	generatePdfSession1: generatePdfSession1,
            generatePdfSession2: generatePdfSession2,
            generatePdfSession3: generatePdfSession3,
            generatePdfSession4: generatePdfSession4
        };
        return service;

        // This function generates PDF for session 1
        function generatePdfSession1(patient, indexSession) {
            
            var doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.text(20, 20, 'Bilan de la séance 1 - ' + patient.lastname + ' ' + patient.firstname);   // (left, height position, title)
            
            // Content
            doc.setFontSize(16);
            doc.line(20, 30, 200, 30); // horizontal line   (left, , size, );
            doc.text(20, 40, 'Bilan de la séance 1 - ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 2
        function generatePdfSession2(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 3
        function generatePdfSession3(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 4
        function generatePdfSession4(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }

    }
})();
