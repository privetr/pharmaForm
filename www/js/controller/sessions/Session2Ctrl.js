(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER Session2Ctrl
	 * Page : seance_2.html
	 * Goal : Managing seance 2
	 */
    
    
	.controller('Session2Ctrl', Session2Ctrl);
	
	Session2Ctrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService',
                             '$ionicPopup', '$ionicLoading', '$localForage', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', 
                            '$ionicModal', '$timeout'];

	/* @ngInject */
	function Session2Ctrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicModal, $timeout) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        var currentScrollYPosition = 0;
        
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
                        console.log('Patient : ', vm.patient);
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
                template: '<em class="item-center item-text-wrap">Etes-vous sûr de vouloir terminer la séance ?</em>',
                title: 'Enregistrer séance',
                scope: $scope,
                buttons: [
                      {
                          text: 'Annuler',
                          type: 'button-stable button-clear'
                      },
                      {
                          text: '<b>Enregistrer</b>',
                          type: 'button-energized button-clear',
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
            
            // we have to save all answers for Session 1
            vm.session.answer = {};

            
            var tmpAlreadyDone = false;
            
            // We save session
            if (vm.patient.listSessionsOver !== undefined) {    // Some sessions have already been saved
                // We have to check if the current session has already been saved
                for (var i = 0 ; i < vm.patient.listSessionsOver.length ; i++) {
                    if (vm.patient.listSessionsOver[i] === vm.session.id) {
                        tmpAlreadyDone = true;
                        
                        // We have to delete the last version saved from vm.listSessionsOver
                        vm.patient.listSessionsOver.splice(i, 1);
                        vm.patient.listSessionsOver.push(vm.session.id);    // List of sessions over
                        
                        // We have to remove the previous answers from vm.patient.listSessionsAnswers
                        for (var j = 0 ; j < vm.patient.listSessionsAnswers.length ; j++) {
                            if (vm.patient.listSessionsAnswers[j].id === vm.session.id) {
                                vm.patient.listSessionsAnswers.splice(j, 1);
                                vm.patient.listSessionsAnswers.push(vm.session);
                                break;
                            }
                        }
                    }
                }
                
                // If tmpAlreadyDone is false, it means that this session has never been saved before
                if(!tmpAlreadyDone){
                    vm.patient.listSessionsOver.push(vm.session.id);
                    vm.patient.listSessionsAnswers.push(vm.session);
                }
            }
            else {  // None session has already been saved
                vm.patient.listSessionsOver = [];   // List of sessions over
                vm.patient.listSessionsOver.push(vm.session.id);
                
                vm.patient.listSessionsAnswers = [];    // List of session answers
                vm.patient.listSessionsAnswers.push(vm.session);
            }

            vm.listPatients[vm.patient.indexPatient].patient.listSessionsOver = vm.patient.listSessionsOver;      
            vm.listPatients[vm.patient.indexPatient].patient.listSessionsAnswers = vm.patient.listSessionsAnswers; 
                
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Séance 2 terminée', 'La séance 2 est désormais terminée, Félicitations !');
                $state.go('choice_session', {patientId: vm.patient.id} );
            })
            
            displayButtonSaveSession();
        }
        
        vm.openModalAntiReject = function() {
            $ionicModal.fromTemplateUrl('templates/modals/modalAntiReject.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalAntiReject = modal;
                $scope.modalAntiReject.show();
            });
        }

        vm.openModalAntiInfection = function() {
            $ionicModal.fromTemplateUrl('templates/modals/modalAntiInfection.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalAntiInfection = modal;
                $scope.modalAntiInfection.show();
            });
        }
        
        vm.openModalOtherPrescription = function() {
            $ionicModal.fromTemplateUrl('templates/modals/modalOtherPrescription.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalOtherPrescription = modal;
                $scope.modalOtherPrescription.show();
            });
        }
        
        /*
     	 * UI BUTTONS
     	 * Function to process with waiting time when saving a new Session
     	 */
    	function hideButtonSaveSession(){
    		$ionicLoading.show({
    			template: '<ion-spinner icon="android"></ion-spinner><br>Enregistrement...'
		    });
    	}
    	
    	function displayButtonSaveSession(){
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
        
        vm.scroll = function(indexSlide, scrollDirection) {
            var nameContent = 'mainScroll-' + indexSlide;
            
            // Here is a ticket on Github to fix up a problem which can happens with scroll-delegate with dynamic slides
            // https://github.com/driftyco/ionic/issues/1865
            
            var instances = $ionicScrollDelegate['_instances'];
            
            console.log(instances, nameContent);

            var instance = _(instances).find(function(ins) {
                return ins.$element[0].id === nameContent;
            });

            if (scrollDirection === 'down') {
                currentScrollYPosition = instance.getScrollPosition().top + 300;
            }
            else if (scrollDirection === 'top') {
                currentScrollYPosition = instance.getScrollPosition().top - 300;
            }
            $ionicScrollDelegate.scrollTo(0, currentScrollYPosition, true);
        };
        
        vm.popupBack = function() {
            var params = { patientId: vm.patient.id};
        	pfUtilsService.popupBack('choice_session', params);
        };
        
        
	}

})();