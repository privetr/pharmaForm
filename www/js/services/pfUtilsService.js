(function () {
    'use strict';

    angular.module('starter').factory('pfUtilsService', pfUtilsService);

    pfUtilsService.$inject = ['$http', '$q', '$rootScope', '$ionicPopup'];

    function pfUtilsService($http, $q, $rootScope, $ionicPopup) {
    	
        var service = {
        	transformationToArray: transformationToArray,
        	showAlert: showAlert,
            getListGraftType: getListGraftType,
            getListGraftIndication: getListGraftIndication,
            getListDosageTimes: getListDosageTimes,
            getIndexOf: getIndexOf
        };

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
           var listGraftIndication = [
                { name: 'Mucoviscidose',    selected: false },
                { name: 'BPCO',   selected: false },
                { name: 'Emphysème / DPP',     selected: false },
                { name: 'HTAP', selected: false },
                { name: 'Fibrose pulmonaire', selected: false },
                { name: 'Déficit en a anti trypsine', selected: false }
           ];
           return listGraftIndication;
     	}
        
        function getListDosageTimes() {
     	   var listDosageTimes = {
               "1" : "1",
               "2" : "2",
               "3" : "3",
               "4" : "4",
               "5" : "5"
           }
           return listDosageTimes;
     	}
        
        function getListDosageTimes() {
     	   var listDosageTimes = {
               "1" : "1",
               "2" : "2",
               "3" : "3",
               "4" : "4",
               "5" : "5"
           }
           return listDosageTimes;
     	}
        
        function getIndexOf(arr, val, prop) {
            var l = arr.length,
            k = 0;
            for (k = 0; k < l; k = k + 1) {
                if (arr[k][prop] === val) {
                    return k;
                }
            }
            return false;
        }

    }
})();
