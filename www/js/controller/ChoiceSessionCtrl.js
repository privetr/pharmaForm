(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ChoiceSessionCtrl
	 * Page : choice_session.html
	 * Goal : Managing Choice Session
	 */
	
	.controller('ChoiceSessionCtrl', ChoiceSessionCtrl);
	
	ChoiceSessionCtrl.$inject = ['$state', '$scope', '$stateParams',
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', 'pfPdfGeneratorService'];

	/* @ngInject */
	function ChoiceSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService, pfPdfGeneratorService) {

		var vm = this;
        
        vm.sessions = {};
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
		
        /*
         * Get Sessions
         */
        vm.getSessions = function() {
            pfLookUpService.getSessions()
            .then(function (result) {
            	console.log('getSessions return : ', result);
                vm.sessions = result.data.session;
            });
        }
        vm.getSessions();
        
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
         * Generation of PDF
         */
        
        var success = function(status) {
            alert('Message: ' + status);
        }

        var error = function(status) {
            alert('Error: ' + status);
        }
        
        vm.generatePdfSession = function() {
            if (!window.plugin || !window.plugin.email) {
                console.error("no cordova-plugin-email-composer available");
                return;
            }
            
            console.log("generating pdf...");
            
            // https://github.com/cunneen/Cordova-PDF-Example-using-jsPDF/blob/master/www/js/jutoPDFCreator.js
            var pdfOutput = pfPdfGeneratorService.generatePdfSession1(vm.patient);
            
            var uristringparts = pdfOutput.split(',');
            uristringparts[0] = 'base64:' + escape(vm.patient.lastname + 'BilanSession.pdf') + '//';

            var moddeduristring =  uristringparts.join('');
            
            var emailProperties = {
                to: ['privet.remi@gmail.com'],
                attachments: [moddeduristring], // paths to the files you want to attach or base64 encoded data streams
                subject: 'Bilan session', // subject of the email
                body: 'Document PDF Comportant le bilan de la session numéro X de ' + 
                    vm.patient.lastname + ' ' + vm.patient.firstname + '<br/>',
                isHtml: true // indicats if the body is HTML or plain text
            };
            var emailCallback = function() {
                console.log('Email sent');
            };
            window.plugin.email.isServiceAvailable(
                function(isAvailable) {
                    window.plugin.email.open(emailProperties, emailCallback, this);
                }
            );
 
            

        }
        
        
	}

})();