(function () {
    'use strict';

    angular.module('starter').factory('pfLookUpService', pfLookUpService);

    pfLookUpService.$inject = ['$http', '$q'];

    function pfLookUpService($http, $q) {
    	
        var service = {
        	getSessions: getSessions,
            getAntiRejectPrescription: getAntiRejectPrescription,
            getAntiInfectionPrescription: getAntiInfectionPrescription,
            getOtherPrescription: getOtherPrescription,
            getFrequence: getFrequence,
            getTrueFalseQuestions: getTrueFalseQuestions,
            getQuestionsSession4: getQuestionsSession4,
            getVaccin: getVaccin
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
        
        // This function returns the Anti Reject Prescription json file
        function getOtherPrescription() {
            return $http.get('js/sessions/existingmedicine.json');
        }
        
        // This function returns the frequence json file
        function getFrequence() {
            return $http.get('js/sessions/frequence.json');
        }
        
        // This function returns the truefalse json file
        function getTrueFalseQuestions() {
            return $http.get('js/sessions/session4_truefalse.json');
        }
        
        // This function returns the truefalse json file
        function getQuestionsSession4() {
            return $http.get('js/sessions/session4_questions.json');
        }
        
        // This function returns the vaccins json file
        function getVaccin() {
            return $http.get('js/sessions/vaccins.json');
        }
        
    }
})();
