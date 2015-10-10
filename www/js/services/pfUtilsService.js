(function () {
    'use strict';

    angular.module('starter').factory('pfUtilsService', pfUtilsService);

    pfUtilsService.$inject = ['$http', '$q', '$rootScope', '$ionicPopup', '$state'];

    function pfUtilsService($http, $q, $rootScope, $ionicPopup, $state) {
    	
        var service = {
        	transformationToArray: transformationToArray,
        	showAlert: showAlert,
            getListGraftType: getListGraftType,
            getListGraftIndication: getListGraftIndication,
            getListDosageTimes: getListDosageTimes,
            getIndexOf: getIndexOf,
            popupBack: popupBack,
            popupBackHome: popupBackHome
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
            var myPopup = $ionicPopup.show ({
                template: '<em class="item-center item-text-wrap">'+ template + '</em>',
                title: title,
                buttons: [
                      {
                          text: '<b>OK</b>',
                          type: 'button-royal button-clear'
                      }
                ]
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
                { name: 'Bronchopneumopathie chronique obstructive',   selected: false },
                { name: 'Emphysème / Dilatation des bronches',     selected: false },
                { name: 'Hypertension artérielle pulmonaire', selected: false },
                { name: 'Fibrose pulmonaire', selected: false },
                { name: 'Déficit en alpha-1 antitrypsine', selected: false }
           ];
           return listGraftIndication;
     	}
        
        function getListDosageTimes() {
     	   var listDosageTimes = {
               "0,5" : "0,5",
               "1,0" : "1,0",
               "1,5" : "1,5",
               "2,0" : "2,0",
               "2,5" : "2,5",
               "3,0" : "3,0",
               "3,5" : "3,5",
               "4,0" : "4,0",
               "4,5" : "4,5",
               "5,0" : "5,0"
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
        
        /*
    	 * Function to display a Pop-up to confirm we want to getback
    	 */
    	function popupBack(stateToGo, params) {
            var myPopup = $ionicPopup.show ({
                template: '<em class="item-center item-text-wrap">Etes-vous sûr de vouloir quitter la page  sans enregistrer ?</em>',
                title: 'Attention',
                buttons: [
                      {
                          text: 'Annuler',
                          type: 'button-clear button-stable'
                      },
                      {
                          text: '<b>Continuer</b>',
                          type: 'button-energized button-clear',
                          onTap: function(e) {
                              $state.go(stateToGo, params);
                          }
                      }
                ]
            });
     	};
        
        /*
    	 * Function to display a Pop-up to confirm we want to getbackto home
    	 */
    	function popupBackHome() {
            var myPopup = $ionicPopup.show ({
                template: '<em class="item-center item-text-wrap">Etes-vous sûr de vouloir quitter la page ? Toutes les données non enregistrées seront perdues.</em>',
                title: 'Attention',
                buttons: [
                      {
                          text: 'Annuler',
                          type: 'button-clear button-stable'
                      },
                      {
                          text: '<b>Continuer</b>',
                          type: 'button-energized button-clear',
                          onTap: function(e) {
                              $state.go('home');
                          }
                      }
                ]
            });
     	};

    }
})();
