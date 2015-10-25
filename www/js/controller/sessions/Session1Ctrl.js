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
            if  (e.target.tagName.toLowerCase() == 'input' || e.target.tagName.toLowerCase() == 'img'){
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
        
        vm.alreadyDone = $stateParams.alreadyDone;
        
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
                        
                        // We can display the session if it has already be done
                        if(vm.alreadyDone){
                            vm.setPreviousValues();
                        }
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        vm.setPreviousValues = function() {
            for (var i = 0 ; i < vm.patient.listSessionsAnswers.length ; i++) {
                if (vm.patient.listSessionsAnswers[i].id === $stateParams.sessionId) {
                    // Slide1
                    vm.rangeFeeling = vm.patient.listSessionsAnswers[i].answer.rangeFeeling;
                    vm.rangeRespiratory = vm.patient.listSessionsAnswers[i].answer.rangeRespiratory;
                    vm.rangePain = vm.patient.listSessionsAnswers[i].answer.rangePain;

                    // Slide 2
                    vm.rangeDayLife = vm.patient.listSessionsAnswers[i].answer.rangeDayLife;
                    vm.selectFamilySituation = vm.patient.listSessionsAnswers[i].answer.selectFamilySituation;
                    vm.doYouHaveChildren = vm.patient.listSessionsAnswers[i].answer.doYouHaveChildren;
                    vm.doYouHaveGrandChildren = vm.patient.listSessionsAnswers[i].answer.doYouHaveGrandChildren;
                    vm.contraceptionTrueFalse = vm.patient.listSessionsAnswers[i].answer.contraceptionTrueFalse;
                    vm.contraceptionWhich = vm.patient.listSessionsAnswers[i].answer.contraceptionWhich;
                    vm.pregnantTrueFalse = vm.patient.listSessionsAnswers[i].answer.pregnantTrueFalse;
                    vm.pregnantWhen = vm.patient.listSessionsAnswers[i].answer.pregnantWhen;
                    vm.selectOwner = vm.patient.listSessionsAnswers[i].answer.selectOwner;
                    vm.typeHome = vm.patient.listSessionsAnswers[i].answer.typeHome;
                    vm.homeAdapted = vm.patient.listSessionsAnswers[i].answer.homeAdapted;
                    vm.homeDescription = vm.patient.listSessionsAnswers[i].answer.homeAdapted;
                    vm.doYouHavePets = vm.patient.listSessionsAnswers[i].answer.doYouHavePets;
                    vm.whichPets = vm.patient.listSessionsAnswers[i].answer.whichPets;
                    vm.doYouHaveAllocation = vm.patient.listSessionsAnswers[i].answer.doYouHaveAllocation;

                    // Slide 3
                    vm.domaine1 = vm.patient.listSessionsAnswers[i].answer.domaine1;
                    vm.domaine2 = vm.patient.listSessionsAnswers[i].answer.domaine2;
                    vm.domaine3 = vm.patient.listSessionsAnswers[i].answer.domaine3;
                    vm.domaine4 = vm.patient.listSessionsAnswers[i].answer.domaine4;
                    vm.domaine5 = vm.patient.listSessionsAnswers[i].answer.domaine5;

                    // Slide 4
                    vm.howGoesWork = vm.patient.listSessionsAnswers[i].answer.howGoesWork;
                    vm.workSituation = vm.patient.listSessionsAnswers[i].answer.workSituation;
                    vm.hourAmplitude = vm.patient.listSessionsAnswers[i].answer.hourAmplitude;
                    vm.typeHourWork = vm.patient.listSessionsAnswers[i].answer.typeHourWork;
                    vm.transportation = vm.patient.listSessionsAnswers[i].answer.transportation;
                    vm.timeTransportation = vm.patient.listSessionsAnswers[i].answer.timeTransportation;

                    // Slide 5
                    vm.freeTimeOccupation = vm.patient.listSessionsAnswers[i].answer.freeTimeOccupation;
                    vm.doYouDoSportTrueFalse = vm.patient.listSessionsAnswers[i].answer.doYouDoSportTrueFalse;
                    vm.doYouDoSport = vm.patient.listSessionsAnswers[i].answer.doYouDoSport;
                    vm.importanceSport = vm.patient.listSessionsAnswers[i].answer.importanceSport;
                    vm.doYouGoPartyTrueFalse = vm.patient.listSessionsAnswers[i].answer.doYouGoPartyTrueFalse;
                    vm.doYouGoParty = vm.patient.listSessionsAnswers[i].answer.doYouGoParty;
                    vm.whatDoYouWantToAchieve = vm.patient.listSessionsAnswers[i].answer.whatDoYouWantToAchieve;

                    // Slide 6
                    vm.doYouSmoke = vm.patient.listSessionsAnswers[i].answer.doYouSmoke;
                    vm.passiveSmoke = vm.patient.listSessionsAnswers[i].answer.passiveSmoke;
                    vm.doYouDrink = vm.patient.listSessionsAnswers[i].answer.doYouDrink;
                    vm.effectDrink = vm.patient.listSessionsAnswers[i].answer.effectDrink;

                    // Slide 8
                    vm.whatIsTransplantation = vm.patient.listSessionsAnswers[i].answer.whatIsTransplantation;
                    vm.purposeRegularMedical = vm.patient.listSessionsAnswers[i].answer.whatIsTransplantation;
                    vm.howTalkTransplantationFriends = vm.patient.listSessionsAnswers[i].answer.howTalkTransplantationFriends;
                    vm.situationContactCenter = vm.patient.listSessionsAnswers[i].answer.situationContactCenter;
                    vm.complicationTransplantation = vm.patient.listSessionsAnswers[i].answer.complicationTransplantation;
                    vm.whatIsGraftReject = vm.patient.listSessionsAnswers[i].answer.whatIsGraftReject;

                    // Slide 9
                    vm.organizationDay = vm.patient.listSessionsAnswers[i].answer.organizationDay;

                    // Slide 10
                    vm.positiveElements = vm.patient.listSessionsAnswers[i].answer.positiveElements;
                    vm.negativeElements = vm.patient.listSessionsAnswers[i].answer.negativeElements;
                    vm.someDifficultiesTreatment = vm.patient.listSessionsAnswers[i].answer.someDifficultiesTreatment;
                    vm.whatIsGoodTakeTreatement = vm.patient.listSessionsAnswers[i].answer.whatIsGoodTakeTreatement;
                    vm.secondaryMedicine = vm.patient.listSessionsAnswers[i].answer.whatIsGoodTakeTreatement;

                    // Slide 11
                    vm.automedicationTrueFalse = vm.patient.listSessionsAnswers[i].answer.automedicationTrueFalse;
                    vm.automedication = vm.patient.listSessionsAnswers[i].answer.automedication;
                    vm.otherDoctorTrueFalse = vm.patient.listSessionsAnswers[i].answer.otherDoctorTrueFalse;
                    vm.otherDoctor = vm.patient.listSessionsAnswers[i].answer.otherDoctor;
                    vm.feelingNewTreatmentRange = vm.patient.listSessionsAnswers[i].answer.feelingNewTreatmentRange;
                    vm.feelingNewTreatment = vm.patient.listSessionsAnswers[i].answer.feelingNewTreatment;
                    vm.whatIsBiggetProblemTreatment = vm.patient.listSessionsAnswers[i].answer.whatIsBiggetProblemTreatment;
                    vm.risksMedicine = vm.patient.listSessionsAnswers[i].answer.risksMedicine;

                    // Slide 12
                    vm.changeDecisionTeamRange = vm.patient.listSessionsAnswers[i].answer.changeDecisionTeamRange;
                    vm.libertyDecisionTeamRange = vm.patient.listSessionsAnswers[i].answer.libertyDecisionTeamRange;
                    vm.libertyDecisionTeam = vm.patient.listSessionsAnswers[i].answer.libertyDecisionTeam;
                    vm.uselessActs = vm.patient.listSessionsAnswers[i].answer.uselessActs;
                    vm.fearSubjectsTeam = vm.patient.listSessionsAnswers[i].answer.fearSubjectsTeam;
                }
            }
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
            vm.session.answer.rangeFeeling = vm.rangeFeeling;
            vm.session.answer.rangeRespiratory = vm.rangeRespiratory;
            vm.session.answer.rangePain = vm.rangePain;
            
            // Slide 2
            vm.session.answer.rangeDayLife = vm.rangeDayLife;
            vm.session.answer.selectFamilySituation = vm.selectFamilySituation;
            vm.session.answer.doYouHaveChildren = vm.doYouHaveChildren;
            vm.session.answer.doYouHaveGrandChildren = vm.doYouHaveGrandChildren;
            vm.session.answer.contraceptionTrueFalse = vm.contraceptionTrueFalse;
            vm.session.answer.contraceptionWhich = vm.contraceptionWhich;
            vm.session.answer.pregnantTrueFalse = vm.pregnantTrueFalse;
            vm.session.answer.pregnantWhen = vm.pregnantWhen;
            vm.session.answer.selectOwner = vm.selectOwner;
            vm.session.answer.typeHome = vm.typeHome;
            vm.session.answer.homeAdapted = vm.homeAdapted;
            vm.session.answer.homeDescription = vm.homeDescription;
            vm.session.answer.doYouHavePets = vm.doYouHavePets;
            vm.session.answer.whichPets = vm.whichPets;
            vm.session.answer.doYouHaveAllocation = vm.doYouHaveAllocation;
            
            // Slide 3
            vm.session.answer.domaine1 = vm.domaine1;
            vm.session.answer.domaine2 = vm.domaine2;
            vm.session.answer.domaine3 = vm.domaine3;
            vm.session.answer.domaine4 = vm.domaine4;
            vm.session.answer.domaine5 = vm.domaine5;
            
            // Slide 4
            vm.session.answer.howGoesWork = vm.howGoesWork;
            vm.session.answer.workSituation = vm.workSituation;
            vm.session.answer.hourAmplitude = vm.hourAmplitude;
            vm.session.answer.typeHourWork = vm.typeHourWork;
            vm.session.answer.transportation = vm.transportation;
            vm.session.answer.timeTransportation = vm.timeTransportation;
            
            // Slide 5
            vm.session.answer.freeTimeOccupation = vm.freeTimeOccupation;
            vm.session.answer.doYouDoSportTrueFalse = vm.doYouDoSportTrueFalse;
            vm.session.answer.doYouDoSport = vm.doYouDoSport;
            vm.session.answer.importanceSport = vm.importanceSport;
            vm.session.answer.doYouGoPartyTrueFalse = vm.doYouGoPartyTrueFalse;
            vm.session.answer.doYouGoParty = vm.doYouGoParty;
            vm.session.answer.whatDoYouWantToAchieve = vm.whatDoYouWantToAchieve;
            
            // Slide 6
            vm.session.answer.doYouSmoke = vm.doYouSmoke;
            vm.session.answer.passiveSmoke = vm.passiveSmoke;
            vm.session.answer.doYouDrink = vm.doYouDrink;
            vm.session.answer.effectDrink = vm.effectDrink;
            
            // Slide 8
            vm.session.answer.whatIsTransplantation = vm.whatIsTransplantation;
            vm.session.answer.purposeRegularMedical = vm.purposeRegularMedical;
            vm.session.answer.howTalkTransplantationFriends = vm.howTalkTransplantationFriends;
            vm.session.answer.situationContactCenter = vm.situationContactCenter;
            vm.session.answer.complicationTransplantation = vm.complicationTransplantation;
            vm.session.answer.whatIsGraftReject = vm.whatIsGraftReject;
            
            // Slide 9
            vm.session.answer.organizationDay = vm.organizationDay;
            
            // Slide 10
            vm.session.answer.positiveElements = vm.positiveElements;
            vm.session.answer.negativeElements = vm.negativeElements;
            vm.session.answer.someDifficultiesTreatment = vm.someDifficultiesTreatment;
            vm.session.answer.whatIsGoodTakeTreatement = vm.whatIsGoodTakeTreatement;
            vm.session.answer.secondaryMedicine = vm.secondaryMedicine;
            
            // Slide 11
            vm.session.answer.automedicationTrueFalse = vm.automedicationTrueFalse;
            vm.session.answer.automedication = vm.automedication;
            vm.session.answer.otherDoctorTrueFalse = vm.otherDoctorTrueFalse;
            vm.session.answer.otherDoctor = vm.otherDoctor;
            vm.session.answer.feelingNewTreatmentRange = vm.feelingNewTreatmentRange;
            vm.session.answer.feelingNewTreatment = vm.feelingNewTreatment;
            vm.session.answer.whatIsBiggetProblemTreatment = vm.whatIsBiggetProblemTreatment;
            vm.session.answer.risksMedicine = vm.risksMedicine;
            
            // Slide 12
            vm.session.answer.changeDecisionTeamRange = vm.changeDecisionTeamRange;
            vm.session.answer.libertyDecisionTeamRange = vm.libertyDecisionTeamRange;
            vm.session.answer.libertyDecisionTeam = vm.libertyDecisionTeam;
            vm.session.answer.uselessActs = vm.uselessActs;
            vm.session.answer.fearSubjectsTeam = vm.fearSubjectsTeam;
            
            console.log(vm.session.answer);
            
            // We save session
            if (vm.patient.listSessionsOver !== undefined) {    // Some sessions have already been saved
                vm.patient.listSessionsOver.push(vm.session.id);    // List of sessions over
                vm.patient.listSessionsAnswers.push(vm.session);
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
                pfUtilsService.showAlert('Séance 1 terminée', 'La séance 1 est désormais terminée, Félicitations !');
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
        
        vm.popupBack = function() {
            var params = { patientId: vm.patient.id};
        	pfUtilsService.popupBack('choice_session', params);
        };
        
        
	}

})();