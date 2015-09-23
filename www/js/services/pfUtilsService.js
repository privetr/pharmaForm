(function () {
    'use strict';

    angular.module('starter').factory('pfUtilsService', pfUtilsService);

    pfUtilsService.$inject = ['$http', '$q', '$rootScope', '$ionicPopup'];

    function pfUtilsService($http, $q, $rootScope, $ionicPopup) {
    	
        var service = {
        	transformationToArray: transformationToArray,
        	showAlert: showAlert,
            getListGraftType: getListGraftType,
            getListGraftIndication: getListGraftIndication        };

        return service;

        // This function verifies if the data is an array and if not it transforms it in Array
        function transformationToArray(data) {
            var newObject = [];
            if (! Array.isArray(data)) {
                if (data === '' || data === undefined) {
                    data = [];
                }
                else {
                    var intermediaire = data;
                    data = [];
                    data.push(intermediaire);
                }
            }
            return data;
        }
        
        function showAlert(title, template) {
     	   $ionicPopup.alert({
     	     title: title,
     	     template: template
     	   });
     	}
        
        function getListGraftType() {
     	   var listGraftType = {
               "0" : "Monopulmonaire",
               "1" : "Double monopulmonaire",
               "2" : "Cardiopulmonaire"
           }
           return listGraftType;
     	}
        
        function getListGraftIndication() {
     	   var listGraftIndication = {
               "0" : "Mucoviscidose",
               "1" : "BPCO",
               "2" : "Emphysème / DPP",
               "3" : "HTAP",
               "4" : "Fibrose pulmonaire",
               "5" : "Déficit en a anti trypsine"
           }
           return listGraftIndication;
     	}

    }
})();
