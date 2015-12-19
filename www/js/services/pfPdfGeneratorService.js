(function () {
    'use strict';

    angular.module('starter').factory('pfPdfGeneratorService', pfPdfGeneratorService);

    pfPdfGeneratorService.$inject = ['$http', '$q', '$rootScope'];

    function pfPdfGeneratorService($http, $q, $rootScope) {
    	
        var service = {
        	generatePdfSession1: generatePdfSession1,
            generatePdfSession2: generatePdfSession2,
            generatePdfSession3: generatePdfSession3,
            generatePdfSession4: generatePdfSession4,
            generateBodySession1: generateBodySession1,
            generateBodySession2: generateBodySession2,
            generateBodySession3: generateBodySession3,
            generateBodySession4: generateBodySession4
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
        
        // This function generates BODY for session 1
        function generateBodySession1(patient, indexSession) {
            
            var body = "";

            
            
            return body;
        }
        
        // This function generates BODY for session 2
        function generateBodySession2(patient, indexSession) {
            
            var body = "";

            
            
            return body;
        }
        
        // This function generates BODY for session 3
        function generateBodySession3(patient, indexSession) {

            var body = '<table style="width:100%">' +
                '<tr>' + 
                '<td>Jill</td><td>Smith</td> <td>50</td>' +
                '</tr>' + 
                '<tr>' + 
                '<td>Jill</td><td>Smith</td> <td>50</td>' +
                '</tr>' + 
                '</table>' +
                '<img style="height:50px; width:50px; margin-right: 20px" src="img/session2/anticorps.png">'
            + '<h1>Remi</h1>';
            
            
            return body;
        }
        
        // This function generates BODY for session 4
        function generateBodySession4(patient, indexSession) {
            
            var body = "";

            
            
            return body;
        }

    }
})();
