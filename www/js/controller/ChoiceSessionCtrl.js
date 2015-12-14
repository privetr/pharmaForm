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
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService', 
                                'pfPdfGeneratorService', '$cordovaFile'];

	/* @ngInject */
	function ChoiceSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService, 
                                pfPdfGeneratorService, $cordovaFile) {

		var vm = this;
        
        vm.sessions = {};
        
        vm.patient = {};
        vm.patient.id = $stateParams.patientId;
        
        vm.pdfReady = false;
		
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
        
        vm.generatePdfSession = function(indexSession) {
            
            console.log('Starting generating pdf for session ' + indexSession + '...');
            
            var now = new Date();
            var nowMonth = now.getMonth() + 1;
            vm.nowDate = now.getDate() + "_" + nowMonth + "_" + now.getFullYear();
            console.log(vm.nowDate);
            
            // https://github.com/cunneen/Cordova-PDF-Example-using-jsPDF/blob/master/www/js/jutoPDFCreator.js
            // https://parall.ax/products/jspdf
            var pdfOutput;
            if(indexSession === 1){
                pdfOutput = pfPdfGeneratorService.generatePdfSession1(vm.patient, indexSession);
            } else if(indexSession === 2){
                pdfOutput = pfPdfGeneratorService.generatePdfSession2(vm.patient, indexSession);
            } else if(indexSession === 3){
                pdfOutput = pfPdfGeneratorService.generatePdfSession3(vm.patient, indexSession);
            } else if(indexSession === 4){
                pdfOutput = pfPdfGeneratorService.generatePdfSession4(vm.patient, indexSession);
            }
            
            
            if (!window.plugin || !window.plugin.email) {
               pdfOutput.save(vm.patient.lastname + '_' + vm.patient.firstname + '_BilanSession_' + vm.nowDate + '.pdf');
            } 
            else {
                
                /*window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                   console.log(fileSystem.name);
                   console.log(fileSystem.root.name);
                   console.log(fileSystem.root.fullPath);

                   fileSystem.root.getFile("test.pdf", {create: true}, function(entry) {
                        var fileEntry = entry;
                        console.log(entry);

                        entry.createWriter(function(writer) {
                            writer.onwrite = function(evt) {
                                alert("write success");
                            };

                            console.log("writing to file");
                            writer.write( pdfOutput );
                        }, function(error) {
                            console.log(error);
                        });

                   }, function(error){
                      console.log(error);
                   });
                });*/
                /*$cordovaFile.writeFile(cordova.file.dataDirectory, 'myFile.txt', "testttttt", true)
                .then(function(success){

                    alert("ok");
                }, function(error){
                    alert('did not create file ' + error.code);
                });*/
                
                
                                         
                
                
                // iciii
                /*var reader = new FileReader;
                var myBlob = new Blob([moddeduristring], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(myBlob);
                window.open(fileURL);*/
                
                /*reader.onload = function() {
                    window.open(this.result.replace(/data:.+?\/[^;]+/, "data:application/octet-stream"));
                };
                reader.readAsDataURL(myBlob);*/
                // ici
                
                var pdfOutpurUri = pdfOutput.output('datauristring');
                
                var uristringparts = pdfOutpurUri.split(',');
                uristringparts[0] = 'base64:' + escape(vm.patient.lastname + 'BilanSession-' + vm.nowDate + '.pdf') + '//';

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
                
                window.plugin.email.isAvailable(
                    function(isAvailable) {
                        window.plugin.email.open(emailProperties, emailCallback, this);
                    }
                );
            }


        }
        
        
	}

})();