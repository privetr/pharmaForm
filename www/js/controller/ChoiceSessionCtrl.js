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
                                'pfLocalForageService', 'pfUtilsService', 'pfLookUpService'];

	/* @ngInject */
	function ChoiceSessionCtrl($state, $scope, $stateParams, pfLocalForageService, pfUtilsService, pfLookUpService) {

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
            var docDefinition = { content: 'This is an sample PDF printed with pdfMake' + vm.patient.id };
            //console.log(pdfMake.createPdf(docDefinition).print());
            //console.log(pdfMake.createPdf(docDefinition).open());
            //pdfMake.createPdf(docDefinition).open()
            //pdfMake.createPdf(docDefinition).download();
            //pdfMake.createPdf(docDefinition).open();
            //pdfMake.createPdf(docDefinition).download();
            
            console.log("generating pdf...");
            var doc = new jsPDF();

            doc.text(20, 20, 'HELLO!');
            
            var pdfOutput = doc.output('datauristring');
            
            var uristringparts = pdfOutput.split(',');
      uristringparts[0] = "base64:" + escape("test.pdf") + "//";

      var moddeduristring =  uristringparts.join("");
            
            var emailProperties = {
      to: ["privet.remi@gmail.com"], // email addresses for TO field
//                cc: [], // email addresses for CC field
//                bcc: [], // email addresses for BCC field
      attachments: [moddeduristring], // paths to the files you want to attach or base64 encoded data streams
      subject: "Sample PDF", // subject of the email
      body: "Sample PDF is attached.<br/>", // email body (could be HTML code, in this case set isHtml to true)
      isHtml: true // indicats if the body is HTML or plain text
    };
    var emailCallback = function() {
       console.log('email view dismissed');
    };
    window.plugin.email.isServiceAvailable(
            function(isAvailable) {
              window.plugin.email.open(emailProperties, emailCallback, this);
            }
    );
            //https://github.com/cunneen/Cordova-PDF-Example-using-jsPDF/blob/master/www/js/jutoPDFCreator.js
            //window.open(pdfOutput, "_blank", "EnableViewPortScale=yes,location=no,disallowoverscroll=yes,allowInlineMediaPlayback=yes,toolbarposition=top,transitionstyle=fliphorizontal");
            
            //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
            //http://www.tricedesigns.com/2014/01/08/generating-pdf-inside-of-phonegap-apps/
            /*console.log("file system...");
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
 
           console.log(fileSystem.name);
           console.log(fileSystem.root.name);
           console.log(fileSystem.root.fullPath);

           fileSystem.root.getFile("test.pdf", {create: true}, function(entry) {
                  var fileEntry = entry;
                  console.log(entry);

                  entry.createWriter(function(writer) {
                      writer.onwrite = function(evt) {
                         console.log("write success");
                      };

                      console.log("writing to file");
                      writer.write( pdfOutput );
                  }, function(error) {
                      console.log(error);
                  });

               }, function(error){
                  console.log(error);
               });
            },
            function(event){
                console.log( evt.target.error.code );
            });*/
            

        }
        
        
	}

})();