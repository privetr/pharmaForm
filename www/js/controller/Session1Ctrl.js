(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER Session1Ctrl
	 * Page : seance_1.html
	 * Goal : Managing seance 1
	 */
	
    .directive('preventDrag', function($ionicGesture, $ionicSlideBoxDelegate) {
      return {
        restrict :  'A',
        link : function(scope, elem, attrs, e) {
          var reportEvent = function (e){
            if  (e.target.tagName.toLowerCase() == 'input'){
                $ionicSlideBoxDelegate.enableSlide(false);
            }
            else{
                $ionicSlideBoxDelegate.enableSlide(true);
            }
          };
          $ionicGesture.on('drag', reportEvent, elem);
        }
      };
    })
    
	.controller('Session1Ctrl', Session1Ctrl);
	
	Session1Ctrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService',
                             '$ionicPopup', '$ionicLoading', '$localForage', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function Session1Ctrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage, $ionicSlideBoxDelegate) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
		/*
		 * Get Patient
		 */		
		vm.getPatient = function() {

            pfLocalForageService.getListPatients()
            .then (function(listPatients) {
                vm.listPatients = pfUtilsService.transformationToArray(listPatients);
                for (var i = 0 ; i < vm.listPatients.length ; i++) {
                    if (vm.listPatients[i].patient.guid === vm.patient.id) {
                        vm.patient = vm.listPatients[i].patient;
                        vm.patient.id = $stateParams.patientId;
                        vm.patient.indexPatient = i;
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        
        /*
    	 * Function to display a Pop-up to confirm we want to save the Session
    	 */
    	vm.popupSaveSession = function() {
            var myPopup = $ionicPopup.show ({
                template: 'Etes-vous sûr de vouloir terminer la séance ?',
                title: 'Enregistrer séance',
                scope: $scope,
                buttons: [
                      { text: 'Annuler' },
                      {
                          text: '<b>Enregistrer</b>',
                          type: 'button-energized',
                          onTap: function(e) {
                              vm.saveSession();
                          }
                      }
                ]
            });
     	};
        
        
        /*
		 * SAVE SESSION
		 * Function to save a Session
		 */
		vm.saveSession = function (){
            // We unshow the button to save Session to avoid multiple send and we display a dialog alert
            hideButtonSaveSession();
            
            // We save session
            if (vm.patient.listSessionsOver !== undefined) {
                vm.patient.listSessionsOver.push(vm.session.id);
            }
            else {
                vm.patient.listSessionsOver = [];
                vm.patient.listSessionsOver.push(vm.session.id);
            }

            vm.listPatients[vm.patient.indexPatient].patient.listSessionsOver = vm.patient.listSessionsOver;                
                
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Séance terminée', 'La séance est désormais terminée, félicitations');
                $state.go('choice_session', {patientId: vm.patient.id} );
            })
            
            displayButtonSaveSession();
        }
        
        
        /*
     	 * UI BUTTONS
     	 * Function to process with waiting time when saving a new Session
     	 */
    	function hideButtonSaveSession(){
    		$( "#button_save_session" ).toggle( "fast", function() {
				// Animation complete
			});
    		$ionicLoading.show({
    			template: '<ion-spinner icon="android"></ion-spinner><br>Enregistrement...'
		    });
    	}
    	
    	function displayButtonSaveSession(){
    		$( "#button_save_session" ).toggle( "fast", function() {
				// Animation complete
			});
    		$ionicLoading.hide();
    	}
        
        /*
		 * SLIDERS
		 * Functions to manage sliding mode
		 */
		vm.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		vm.previousSlide = function() {
			$ionicSlideBoxDelegate.previous();
		}  	
        
        
	}

})();