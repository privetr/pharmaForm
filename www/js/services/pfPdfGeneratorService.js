(function () {
    'use strict';

    angular.module('starter').factory('pfPdfGeneratorService', pfPdfGeneratorService);

    pfPdfGeneratorService.$inject = ['$http', '$q', '$rootScope'];

    function pfPdfGeneratorService($http, $q, $rootScope) {
    	
        var service = {
        	generatePdfSession1: generatePdfSession1,
            generatePdfSession2: generatePdfSession2,
            generatePdfSession3: generatePdfSession3,
            generatePdfSession4: generatePdfSession4,
            generateBodySession1: generateBodySession1,
            generateBodySession2: generateBodySession2,
            generateBodySession3: generateBodySession3,
            generateBodySession4: generateBodySession4
        };
        return service;

        // This function generates PDF for session 1
        function generatePdfSession1(patient, indexSession) {
            
            var doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.text(20, 20, 'Bilan de la séance 1 - ' + patient.lastname + ' ' + patient.firstname);   // (left, height position, title)
            
            // Content
            doc.setFontSize(16);
            doc.line(20, 30, 200, 30); // horizontal line   (left, , size, );
            doc.text(20, 40, 'Bilan de la séance 1 - ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 2
        function generatePdfSession2(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 3
        function generatePdfSession3(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates PDF for session 4
        function generatePdfSession4(patient, indexSession) {
            
            var doc = new jsPDF();

            doc.text(20, 20, 'Bilan ' + patient.lastname + ' ' + patient.firstname);
            
            // We save the doc
            var isFileSaverSupported = !!new Blob;
            if(isFileSaverSupported){
                console.log('File Saver supported');
            }
            
            return doc;
        }
        
        // This function generates BODY for session 1
        function generateBodySession1(patient, indexSession) {
            
            var body = '<h2><font color="#2196F3">Bilan de la session 1 - ' + patient.lastname + ' ' + patient.firstname + ' </font></h2>';
            body += '<h3><font color="#D9004D">Diagnostic éducatif</font></h3>';
            var session = {};
            
            for (var i = 0 ; i < patient.listSessionsAnswers.length ; i++) {
                if (patient.listSessionsAnswers[i].id === 'session_1') {
                    // Slide1
                    session = patient.listSessionsAnswers[i].answer;
                    break;
                }
            }
            
            // Slide1
            body += '<h4><font color="#D9004D">Aujourd’hui, à ce moment précis...</font></h4>';
            if(session.rangeFeeling){
                body += 'Comment vous-sentez vous ?' + ' ' + session.rangeFeeling + '/100<br>';
            }
            if(session.rangeFeelingText){
                body += 'Commentaire :' + ' ' + session.rangeFeelingText + '/100<br>';
            }
            if(session.rangeRespiratory){
                body += 'Que pouvez-vous dire de votre fonction respiratoire ?' + ' ' + session.rangeRespiratory + '/100<br>';
            }
            if(session.rangePain){
                body += 'Avez-vous des douleurs ?' + ' ' + session.rangePain + '/100<br>';
            }
            if(session.rangePainText){
                body += 'Commentaire :' + ' ' + session.rangePainText + '/100<br>';
            }

            // Slide 2
            body += '<h4><font color="#D9004D"> A propos de votre vie quotidienne...</font></h4>';
            if(session.rangeDayLife){
                body += 'Comment cela se passe-t-il ?' + ' ' + session.rangeDayLife + '/100<br>';
            }
            if(session.selectFamilySituation){
                body += 'Quelle est votre situation familiale ?' + ' ' + session.selectFamilySituation + '<br>';
            }
            if(session.doYouHaveChildren){
                body += 'Avez-vous des enfants ?' + ' ' + session.doYouHaveChildren + '<br>';
            }
            if(session.doYouHaveGrandChildren){
                body += 'Avez-vous des petits-enfants ?' + ' ' + session.doYouHaveGrandChildren + '<br>';
            }
            if(session.contraceptionTrueFalse){
                body += 'Avez-vous un ou des moyens de contraception ?' + ' ' + session.contraceptionTrueFalse + '<br>';
            }
            if(session.contraceptionWhich){
                body += 'Le(s)quel(s) ?' + ' ' + session.contraceptionWhich + '<br>';
            }
            if(session.pregnantTrueFalse){
                body += ' Avez-vous un projet de grossesse ?' + ' ' + session.pregnantTrueFalse + '<br>';
            }
            if(session.pregnantWhen){
                body += 'Dans quel délai ?' + ' ' + session.pregnantWhen + '<br>';
            }
            if(session.selectOwner){
                body += 'Êtes-vous ? ' + ' ' + session.selectOwner + '<br>';
            }
            if(session.typeHome){
                body += 'Vivez vous en ?' + ' ' + session.typeHome + '<br>';
            }
            if(session.homeAdapted){
                body += 'Votre logement est-il adapté ? ' + ' ' + session.homeAdapted + '<br>';
            }
            if(session.homeDescription){
                body += 'Etage, m², ...' + ' ' + session.homeDescription + '<br>';
            }
            if(session.doYouHavePets){
                body += 'Avez-vous des animaux domestiques ?' + ' ' + session.doYouHavePets + '<br>';
            }
            if(session.whichPets){
                body += 'Lesquels ?' + ' ' + session.whichPets + '<br>';
            }
            if(session.doYouHaveAllocation){
                body += 'Invalidité, ...' + ' ' + session.doYouHaveAllocation + '<br>';
            }

            // Slide 3
            body += '<h4><font color="#D9004D"> A propos de ces différent domaines... Comment vous sentez-vous ?</font></h4>';
            if(session.domaine1){
                body += 'Vie sociale' + ' ' + session.domaine1 + '<br>';
            }
            if(session.domaine2){
                body += 'Santé physique' + ' ' + session.domaine2 + '<br>';
            }
            if(session.domaine3){
                body += 'Vie sexuelle' + ' ' + session.domaine3 + '<br>';
            }
            if(session.domaine4){
                body += 'Vie affective' + ' ' + session.domaine4 + '<br>';
            }
            if(session.domaine5){
                body += 'Equilibre psychologique' + ' ' + session.domaine5 + '<br>';
            }

            // Slide 4
            body += '<h4><font color="#D9004D">A propos de votre travail ou de vos études...</font></h4>';
            if(session.howGoesWork){
                body += 'Comment cela se passe t-il ?' + ' ' + session.howGoesWork + '<br>';
            }
            if(session.workSituation){
                body += 'Votre situation actuelle ' + ' ' + session.workSituation + '<br>';
            }
            if(session.hourAmplitude){
                body += 'Amplitude horaire' + ' ' + session.hourAmplitude + '<br>';
            }
            if(session.typeHourWork){
                body += 'Temps complet / temps partiel ' + ' ' + session.typeHourWork + '<br>';
            }
            if(session.transportation){
                body += 'Moyen de transport' + ' ' + session.transportation + '<br>';
            }
            if(session.timeTransportation){
                body += 'Durée moyenne de transport par jour' + ' ' + session.timeTransportation + '<br>';
            }

            // Slide 5
            body += '<h4><font color="#D9004D">A propos de vos loisirs...</font></h4>';
            if(session.freeTimeOccupation){
                body += 'Que faites vous de votre temps libre ? Comment cela se passe t-il ?' + ' ' + session.freeTimeOccupation + '<br>';
            }
            if(session.doYouDoSportTrueFalse){
                body += 'Pratiquez-vous une activité physique ?' + ' ' + session.doYouDoSportTrueFalse + '<br>';
            }
            if(session.doYouDoSport){
                body += 'Laquelle ? Nombre d\'heures ?' + ' ' + session.doYouDoSport + '<br>';
            }
            if(session.importanceSport){
                body += 'En quoi une activité physique est-elle importante, pour vous ?' + ' ' + session.importanceSport + '<br>';
            }
            if(session.doYouGoPartyTrueFalse){
                body += 'Vous arrive-t-il de sortir avec vos amis ou vos collègues ?' + ' ' + session.doYouGoPartyTrueFalse + '<br>';
            }
            if(session.doYouGoParty){
                body += 'Commentaire :' + ' ' + session.doYouGoParty + '<br>';
            }
            if(session.whatDoYouWantToAchieve){
                body += 'Qu’avez-vous envie d’entreprendre ou de réaliser ?' + ' ' + session.whatDoYouWantToAchieve + '<br>';
            }

            // Slide 6
            body += '<h4><font color="#D9004D">En général...</font></h4>';
            if(session.doYouSmoke){
                body += 'Vous arrive t-il de fumer ou d\'en avoir envie ?' + ' ' + session.doYouSmoke + '<br>';
            }
            if(session.passiveSmoke){
                body += 'D\'après vous, quels sont les effets et risques du tabagisme passif et actif ?' + ' ' + session.passiveSmoke + '<br>';
            }
            if(session.doYouDrink){
                body += 'Vous arrive t-il de consommer de l’alcool ou d’en avoir envie ?' + ' ' + session.doYouDrink + '<br>';
            }
            if(session.effectDrink){
                body += 'D’après vous, quels sont les effets et risques de consommer de l’alcool ?' + ' ' + session.effectDrink + '<br>';
            }

            // Slide 8
            body += '<h4><font color="#D9004D">D\'après vous...</font></h4>';
            if(session.whatIsTransplantation){
                body += 'C’est quoi la transplantation ?' + ' ' + session.whatIsTransplantation + '<br>';
            }
            if(session.purposeRegularMedical){
                body += 'Quel est l’intérêt d’un suivi médical régulier ?' + ' ' + session.purposeRegularMedical + '<br>';
            }
            if(session.howTalkTransplantationFriends){
                body += 'Comment parlez-vous de votre maladie à votre entourage ?' + ' ' + session.howTalkTransplantationFriends + '<br>';
            }
            if(session.situationContactCenter){
                body += 'Quelles sont les situations qui vous amènent à contacter votre centre référent ?' + ' ' + session.situationContactCenter + '<br>';
            }
            if(session.complicationTransplantation){
                body += 'Quelles peuvent être les complications liées à la transplantation ?' + ' ' + session.complicationTransplantation + '<br>';
            }
            if(session.whatIsGraftReject){
                body += 'C’est quoi le rejet du greffon ? Quels en sont les signes ? Qu’est-ce qui l’induit ?' + ' ' + session.whatIsGraftReject + '<br>';
            }

            // Slide 9
            body += '<h4><font color="#D9004D">Une journée-type, c\'est...</font></h4>';
            if(session.organizationDay){
                body += 'Racontez-moi la manière dont vous organisez votre journée et la prise de vos traitements par rapport à vos activités ?' + ' ' + session.organizationDay + '<br>';
            }

            // Slide 10
            body += '<h4><font color="#D9004D">Le traitement au quotidien...</font></h4>';
            if(session.feelingNewTreatmentRange){
                body += 'Comment vivez-vous votre nouveau traitement ?' + ' ' + session.feelingNewTreatmentRange + '/100<br>';
            }
            if(session.whatIsBiggetProblemTreatment){
                body += 'Qu’est-ce qui vous parait le plus contraignant dans ce traitement ?' + ' ' + session.whatIsBiggetProblemTreatment + '<br>';
            }
            if(session.someDifficultiesTreatment){
                body += 'Certains patients ont des difficultés avec leur traitement : qu’en pensez-vous ?' + ' ' + session.someDifficultiesTreatment + '<br>';
            }
            if(session.otherDoctorTrueFalse){
                body += 'Prenez-vous des médicaments prescrits par un autre médecin que celui référent de la transplantation ?' + ' ' + session.otherDoctorTrueFalse + '<br>';
            }
            if(session.otherDoctor){
                body += 'Lesquels ?' + ' ' + session.otherDoctor + '<br>';
            }
            if(session.automedicationTrueFalse){
                body += 'Vous arrive t-il de prendre des médicaments en automédication, c’est-à-dire non prescrits ?' + ' ' + session.automedicationTrueFalse + '<br>';
            }
            if(session.automedication){
                body += 'Lesquels ? Dans quelles circonstances ?' + ' ' + session.automedication + '<br>';
            }
            if(session.whatIsGoodTakeTreatement){
                body += 'Pour vous, que signifie « bien prendre son traitement » ?' + ' ' + session.whatIsGoodTakeTreatement + '<br>';
            }
            if(session.secondaryMedicine){
                body += 'Que pensez-vous des médecines complémentaires : homéopathie, acupuncture, ostéopathie, phytothérapie, etc. ?' + ' ' + session.secondaryMedicine + '<br>';
            }
            if(session.risksMedicine){
                body += 'Quels risques à long terme des médicaments percevez-vous ?' + ' ' + session.risksMedicine + '<br>';
            }

            // Slide 11
            body += '<h4><font color="#D9004D"> L\'équipe soignante et vous...</font></h4>';
            if(session.changeDecisionTeamRange){
                body += 'Estimez-vous pouvoir discuter les décisions de l’équipe soignante ?' + ' ' + session.changeDecisionTeamRange + '/100<br>';
            }
            if(session.libertyDecisionTeamRange){
                body += ' Quel degré de liberté de décision vous autorisez-vous par rapport aux décisions de l’équipe soignante ?' + ' ' + session.libertyDecisionTeamRange + '/100<br>';
            }
            if(session.libertyDecisionTeam){
                body += 'Dans quel(s) domaine(s) ?' + ' ' + session.libertyDecisionTeam + '<br>';
            }
            if(session.uselessActs){
                body += 'Parmi les actes que l’on vous demande de faire, y en a-t-il qui vous semble sans intérêt ?' + ' ' + session.uselessActs + '<br>';
            }
            if(session.fearSubjectsTeam){
                body += 'Y a-t-il des sujets que vous n’osez pas aborder avec l’équipe ?' + ' ' + session.fearSubjectsTeam + '<br>';
            }

            
            
            return body;
        }
        
        // This function generates BODY for session 2
        function generateBodySession2(patient, indexSession) {
            
            var body = '';

            
            return body;
        }
        
        // This function generates BODY for session 3
        function generateBodySession3(patient, indexSession) {

            var body = '<table style="width:100%">' +
                '<tr>' + 
                '<td>Jill</td><td>Smith</td> <td>50</td>' +
                '</tr>' + 
                '<tr>' + 
                '<td>Jill</td><td>Smith</td> <td>50</td>' +
                '</tr>' + 
                '</table>' +
                '<img style="height:50px; width:50px; margin-right: 20px" src="img/session2/anticorps.png">'
            + '<h1>Remi</h1>';
            
            
            return body;
        }
        
        // This function generates BODY for session 4
        function generateBodySession4(patient, indexSession) {
            
            var body = '';

            
            
            return body;
        }

    }
})();
