(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER Session4Ctrl
	 * Page : seance_4.html
	 * Goal : Managing seance 4
	 */
    
    // amazing trick to fix problem of dynamic number of slides : https://github.com/driftyco/ionic/issues/1890
	.directive('dynamicSlides', function() {
	    return {
	        require: ['^ionSlideBox'],
	        link: function(scope, elem, attrs, slider) {
	            scope.$watch(function() {
	                return scope.$eval(attrs.dynamicSlides).length;
	            }, function(val) {
	                slider[0].__slider.update();
	            });
	        }
	    };
	})
    
	.controller('Session4Ctrl', Session4Ctrl);
	
	Session4Ctrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService',
                             '$ionicPopup', '$ionicLoading', '$localForage', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];

	/* @ngInject */
	function Session4Ctrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService,
                            $ionicPopup, $ionicLoading, $localForage, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

		var vm = this;
        
        vm.session = {};
        vm.session.id = $stateParams.sessionId;
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        vm.displayAnswerTrueFalse = false;
        
        vm.alreadyDone = $stateParams.alreadyDone;
        
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
                        
                        vm.getTrueFalseQuestion();
                        vm.getQuestions();
                        
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        vm.getTrueFalseQuestion = function() {
            // We can display the session if it has already be done
            if(vm.alreadyDone === '1'){
                for (var i = 0 ; i < vm.patient.listSessionsAnswers.length ; i++) {
                    if (vm.patient.listSessionsAnswers[i].id === $stateParams.sessionId) {
                        vm.listTrueFalseQuestions = vm.patient.listSessionsAnswers[i].answer.listTrueFalseQuestions;
                        vm.listTrueFalseQuestions = _.shuffle(vm.listTrueFalseQuestions);
                        console.log('getTrueFalseQuestions return : ', vm.listTrueFalseQuestions);
                        break;
                    }
                }
            }
            else{
                pfLookUpService.getTrueFalseQuestions()
                .then(function (result) {
                    vm.listTrueFalseQuestions = result.data.question; 
                    vm.listTrueFalseQuestions = _.shuffle(vm.listTrueFalseQuestions);
                    console.log('getTrueFalseQuestions return : ', vm.listTrueFalseQuestions);
                });
            }
         }
         
         vm.getQuestions = function() {
             // We can display the session if it has already be done
            if(vm.alreadyDone === '1'){
                for (var i = 0 ; i < vm.patient.listSessionsAnswers.length ; i++) {
                    if (vm.patient.listSessionsAnswers[i].id === $stateParams.sessionId) {
                        vm.listQuestions = vm.patient.listSessionsAnswers[i].answer.listQuestions;
                        console.log('getQuestions return : ', vm.listQuestions);
                        break;
                    }
                }
            }
            else{
                pfLookUpService.getQuestionsSession4()
                .then(function (result) {
                    vm.listQuestions = result.data.question; 
                    console.log('getQuestions return : ', vm.listTrueFalseQuestions);
                });
            }
         }
         
         $scope.checkAnswerQuestion = function(index){
             vm.listQuestions[index].validated = !vm.listQuestions[index].validated;
             $ionicScrollDelegate.resize(); 
         }
        
        
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
            
            // Slide1
            vm.session.answer.listQuestions = vm.listQuestions;
            
            // Slide 2
            vm.session.answer.listTrueFalseQuestions = vm.listTrueFalseQuestions;
            
            
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
                pfUtilsService.showAlert('Séance 4 terminée', 'La séance 4 est désormais terminée, Félicitations !');
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