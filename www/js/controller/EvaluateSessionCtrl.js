(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER EvaluateSessionCtrl
	 * Page : evaluate_session.html
	 * Goal : Managing Evaluation Session
	 */
	
	.controller('EvaluateSessionCtrl', EvaluateSessionCtrl);
	
	EvaluateSessionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', 
                                'pfPdfGeneratorService', '$localForage'];

	/* @ngInject */
	function EvaluateSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService, 
                                pfPdfGeneratorService, $localForage) {

		var vm = this;
        
        vm.bilan = {};
        vm.session = {};
        
        vm.session.id = $stateParams.sessionId;
        vm.bilan.id = $stateParams.sessionId;
        
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
                        console.log('Patient ', vm.patient);
                        vm.session_number = vm.session.id.substring(vm.session.id.indexOf('_') + 1, vm.session.id.length + 1);
                        console.log('Session ', vm.session_number);
                        vm.getBilanSession();
                        break;
                    }
                }
            });
		} 
        vm.getPatient();
        
        vm.getBilanSession = function() {
            // We can display the bilan if it has already be done
            if(_.contains(vm.patient.listEvaluationsOver, vm.bilan.id)){
                for (var i = 0 ; i < vm.patient.listEvaluationsAnswers.length ; i++) {
                    if (vm.patient.listEvaluationsAnswers[i].id === vm.bilan.id) {
                        vm.bilanFinal = vm.patient.listEvaluationsAnswers[i].answer.bilanFinal;
                        console.log('getBilanSession return : ', vm.bilanFinal);
                        break;
                    }
                }
            }
         }
        
        /*
         * Generation of PDF
         */
        
        var success = function(status) {
            alert('Message: ' + status);
        }

        var error = function(status) {
            alert('Error: ' + status);
        }
        
        vm.generatePdfSession = function(indexSession) {
            
            console.log('Starting generating pdf for session ' + indexSession + '...');
            
            var now = new Date();
            var nowMonth = now.getMonth() + 1;
            vm.nowDate = now.getDate() + "_" + nowMonth + "_" + now.getFullYear();
            console.log(vm.nowDate);
            
            // https://github.com/cunneen/Cordova-PDF-Example-using-jsPDF/blob/master/www/js/jutoPDFCreator.js
            // https://parall.ax/products/jspdf
            var pdfOutput;
            var bodyOutput;
            if(indexSession === '1'){
                //pdfOutput = pfPdfGeneratorService.generatePdfSession1(vm.patient, indexSession);
                bodyOutput = pfPdfGeneratorService.generateBodyBilan(vm.patient, indexSession);
            } else if(indexSession === '2'){
                //pdfOutput = pfPdfGeneratorService.generatePdfSession2(vm.patient, indexSession);
                bodyOutput = pfPdfGeneratorService.generateBodyBilan(vm.patient, indexSession);
            } else if(indexSession === '3'){
                //pdfOutput = pfPdfGeneratorService.generatePdfSession3(vm.patient, indexSession);
                bodyOutput = pfPdfGeneratorService.generateBodyBilan(vm.patient, indexSession);
            } else if(indexSession === '4'){
                //pdfOutput = pfPdfGeneratorService.generatePdfSession4(vm.patient, indexSession);
                bodyOutput = pfPdfGeneratorService.generateBodyBilan(vm.patient, indexSession);
            }

            if (!window.plugin || !window.plugin.email) {
                pfUtilsService.showAlert('Erreur', 'Impossible d\'envoyer un mail');
            } 
            else {
                var emailProperties = {
                    to: [],
                    attachments: [], // paths to the files you want to attach or base64 encoded data streams
                    subject: 'Bilan session', // subject of the email
                    body: bodyOutput,
                    isHtml: true // indicats if the body is HTML or plain text
                };
                var emailCallback = function() {
                    console.log('Email sent');
                };

                window.plugin.email.isAvailable(
                    function(isAvailable) {
                        window.plugin.email.open(emailProperties, emailCallback, this);
                    }
                );
            }
        }
        
        /*
		 * SAVE EVALUATION
		 * Function to save a Session
		 */
		vm.saveEvaluation = function (){
            
            // we have to save all answers for Session 1
            vm.bilan.answer = {};
            
            // Slide 3
            vm.bilan.answer.bilanFinal = vm.bilanFinal;
            
            var tmpAlreadyDone = false;
            
            // We save session
            if (vm.patient.listEvaluationsOver !== undefined) {    // Some sessions have already been saved
                // We have to check if the current session has already been saved
                for (var i = 0 ; i < vm.patient.listEvaluationsOver.length ; i++) {
                    if (vm.patient.listEvaluationsOver[i] === vm.session.id) {
                        tmpAlreadyDone = true;
                        
                        // We have to delete the last version saved from vm.listEvaluationsOver
                        vm.patient.listEvaluationsOver.splice(i, 1);
                        vm.patient.listEvaluationsOver.push(vm.session.id);    // List of evaluations over
                        
                        // We have to remove the previous answers from vm.patient.listEvaluationsAnswers
                        for (var j = 0 ; j < vm.patient.listEvaluationsAnswers.length ; j++) {
                            if (vm.patient.listEvaluationsAnswers[j].id === vm.session.id) {
                                vm.patient.listEvaluationsAnswers.splice(j, 1);
                                vm.patient.listEvaluationsAnswers.push(vm.bilan);
                                break;
                            }
                        }
                    }
                }
                
                // If tmpAlreadyDone is false, it means that this session has never been saved before
                if(!tmpAlreadyDone){
                    vm.patient.listEvaluationsOver.push(vm.session.id);
                    vm.patient.listEvaluationsAnswers.push(vm.bilan);
                }
            }
            else {  // None session has already been saved
                vm.patient.listEvaluationsOver = [];   // List of sessions over
                vm.patient.listEvaluationsOver.push(vm.session.id);
                
                vm.patient.listEvaluationsAnswers = [];    // List of session answers
                vm.patient.listEvaluationsAnswers.push(vm.bilan);
            }

            vm.listPatients[vm.patient.indexPatient].patient.listEvaluationsOver = vm.patient.listEvaluationsOver;      
            vm.listPatients[vm.patient.indexPatient].patient.listEvaluationsAnswers = vm.patient.listEvaluationsAnswers; 
                
            $localForage.setItem('listPatients', vm.listPatients)
            .then(function() {
                pfUtilsService.showAlert('Bilan enregistré', 'Le bilan de la séance ' + vm.session_number + ' est enregistré');
                $state.go('choice_session', {patientId: vm.patient.id} );
            })
        }
        
        
	}

})();