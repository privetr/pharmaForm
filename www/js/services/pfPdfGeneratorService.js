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
                body += 'Commentaire :' + ' ' + session.rangeFeelingText + '<br>';
            }
            if(session.rangeRespiratory){
                body += 'Que pouvez-vous dire de votre fonction respiratoire ?' + ' ' + session.rangeRespiratory + '/100<br>';
            }
            if(session.rangePain){
                body += 'Avez-vous des douleurs ?' + ' ' + session.rangePain + '/100<br>';
            }
            if(session.rangePainText){
                body += 'Commentaire :' + ' ' + session.rangePainText + '<br>';
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
                body += 'Avez-vous un ou des moyens de contraception ?' + ' ' + getTrueFalse(session.contraceptionTrueFalse) + '<br>';
            }
            if(session.contraceptionWhich){
                body += 'Le(s)quel(s) ?' + ' ' + session.contraceptionWhich + '<br>';
            }
            if(session.pregnantTrueFalse){
                body += ' Avez-vous un projet de grossesse ?' + ' ' + getTrueFalse(session.pregnantTrueFalse) + '<br>';
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
                body += 'Votre logement est-il adapté ? ' + ' ' + getTrueFalse(session.homeAdapted) + '<br>';
            }
            if(session.homeDescription){
                body += 'Etage, m², ...' + ' ' + session.homeDescription + '<br>';
            }
            if(session.doYouHavePets){
                body += 'Avez-vous des animaux domestiques ?' + ' ' + getTrueFalse(session.doYouHavePets) + '<br>';
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
                body += 'Vie sociale' + ' ' + session.domaine1 + '/100<br>';
            }
            if(session.domaine2){
                body += 'Santé physique' + ' ' + session.domaine2 + '/100<br>';
            }
            if(session.domaine3){
                body += 'Vie sexuelle' + ' ' + session.domaine3 + '/100<br>';
            }
            if(session.domaine4){
                body += 'Vie affective' + ' ' + session.domaine4 + '/100<br>';
            }
            if(session.domaine5){
                body += 'Equilibre psychologique' + ' ' + session.domaine5 + '/100<br>';
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
                body += 'Pratiquez-vous une activité physique ?' + ' ' + getTrueFalse(session.doYouDoSportTrueFalse) + '<br>';
            }
            if(session.doYouDoSport){
                body += 'Laquelle ? Nombre d\'heures ?' + ' ' + session.doYouDoSport + '<br>';
            }
            if(session.importanceSport){
                body += 'En quoi une activité physique est-elle importante, pour vous ?' + ' ' + session.importanceSport + '<br>';
            }
            if(session.doYouGoPartyTrueFalse){
                body += 'Vous arrive-t-il de sortir avec vos amis ou vos collègues ?' + ' ' + getTrueFalse(session.doYouGoPartyTrueFalse) + '<br>';
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
                body += 'Vous arrive t-il de fumer ou d\'en avoir envie ?' + ' ' + getTrueFalse(session.doYouSmoke) + '<br>';
            }
            if(session.passiveSmoke){
                body += 'D\'après vous, quels sont les effets et risques du tabagisme passif et actif ?' + ' ' + session.passiveSmoke + '<br>';
            }
            if(session.doYouDrink){
                body += 'Vous arrive t-il de consommer de l’alcool ou d’en avoir envie ?' + ' ' + getTrueFalse(session.doYouDrink) + '<br>';
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
                body += 'Prenez-vous des médicaments prescrits par un autre médecin que celui référent de la transplantation ?' + ' ' + getTrueFalse(session.otherDoctorTrueFalse) + '<br>';
            }
            if(session.otherDoctor){
                body += 'Lesquels ?' + ' ' + session.otherDoctor + '<br>';
            }
            if(session.automedicationTrueFalse){
                body += 'Vous arrive t-il de prendre des médicaments en automédication, c’est-à-dire non prescrits ?' + ' ' + getTrueFalse(session.automedicationTrueFalse) + '<br>';
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

            var body = '';
            
            
            return body;
        }
        
        // This function generates BODY for session 4
        function generateBodySession4(patient, indexSession) {
            
            var body = '<h2><font color="#2196F3">Bilan de la session 4 - ' + patient.lastname + ' ' + patient.firstname + ' </font></h2>';
            body += '<h3><font color="#D9004D">Auto-évaluation</font></h3>';
            var session = {};

            for (var i = 0 ; i < patient.listSessionsAnswers.length ; i++) {
                if (patient.listSessionsAnswers[i].id === 'session_4') {
                    session = patient.listSessionsAnswers[i].answer.bilanFinal;
                    console.log('Session which will be sent : ', session);
                    break;
                }
            }
            
            var itemOK = 0;
            var itemNOK = 0;
            var itemKO = 0;
            
            var answersBody = '';
            
            // TITLE 1 
            answersBody += '<h3><font color="#2196F3">1. Connaissance de la maladie</font></h3>';
            // TITLE 1 ITEM 1
            answersBody += '<h4><font color="#D9004D">Compréhension de la maladie</font></h4>';
            if(session.bilan100){
                answersBody += 'Connaître le principe de la greffe et savoir l’expliquer.' + ' ' + getResultBilanSession4(session.bilan100) + '<br>';
                if(session.bilan100 === '3') itemOK++;
                if(session.bilan100 === '2') itemNOK++;
                if(session.bilan100 === '1') itemKO++;
            }
            if(session.bilan101){
                answersBody += 'Comprendre la notion de rejet et reconnaître les signes d’appel associés.' + ' ' + getResultBilanSession4(session.bilan101) + '<br>';
                if(session.bilan101 === '3') itemOK++;
                if(session.bilan101 === '2') itemNOK++;
                if(session.bilan101 === '1') itemKO++;
            }
            if(session.bilan102){
                answersBody += 'Comprendre la notion d’immunosuppression et le risque infectieux associé.' + ' ' + getResultBilanSession4(session.bilan102) + '<br>';
                if(session.bilan102 === '3') itemOK++;
                if(session.bilan102 === '2') itemNOK++;
                if(session.bilan102 === '1') itemKO++;
            }
            if(session.bilan103){
                answersBody += 'Connaître les complications de la greffe à court, moyen et long terme.' + ' ' + getResultBilanSession4(session.bilan103) + '<br>';
                if(session.bilan103 === '3') itemOK++;
                if(session.bilan103 === '2') itemNOK++;
                if(session.bilan103 === '1') itemKO++;
            }
            if(session.bilan100){
                answersBody += 'Connaître le principe de la greffe et savoir l’expliquer.' + ' ' + getResultBilanSession4(session.bilan100) + '<br>';
                if(session.bilan100 === '3') itemOK++;
                if(session.bilan100 === '2') itemNOK++;
                if(session.bilan100 === '1') itemKO++;
            }
            
            // TITLE 2
            answersBody += '<h3><font color="#2196F3">2. Connaissance des traitements</font></h3>';
            // TITLE 2 ITEM 1
            answersBody += '<h4><font color="#D9004D">Anti-Rejets</font></h4>';
            if(session.bilan200){
                answersBody += 'Connaître leur rôle.' + ' ' + getResultBilanSession4(session.bilan200) + '<br>';
                if(session.bilan200 === '3') itemOK++;
                if(session.bilan200 === '2') itemNOK++;
                if(session.bilan200 === '1') itemKO++;
            }
            if(session.bilan201){
                answersBody += 'Comprendre l’intérêt d’une prise au long cours et d’une bonne observance.' + ' ' + getResultBilanSession4(session.bilan201) + '<br>';
                if(session.bilan201 === '3') itemOK++;
                if(session.bilan201 === '2') itemNOK++;
                if(session.bilan201 === '1') itemKO++;
            }
            if(session.bilan202){
                answersBody += 'Comprendre l’évolution de la stratégie thérapeutique.' + ' ' + getResultBilanSession4(session.bilan202) + '<br>';
                if(session.bilan202 === '3') itemOK++;
                if(session.bilan202 === '2') itemNOK++;
                if(session.bilan202 === '1') itemKO++;
            }
            if(session.bilan203){
                answersBody += 'Connaître les précautions à suivre au cours du traitement (risque infectieux, hydratation, protection solaire ...).' + ' ' + getResultBilanSession4(session.bilan203) + '<br>';
                if(session.bilan203 === '3') itemOK++;
                if(session.bilan203 === '2') itemNOK++;
                if(session.bilan203 === '1') itemKO++;
            }
            if(session.bilan204){
                answersBody += 'Connaître les surveillances cliniques et biologiques.' + ' ' + getResultBilanSession4(session.bilan204) + '<br>';
                if(session.bilan204 === '3') itemOK++;
                if(session.bilan204 === '2') itemNOK++;
                if(session.bilan204 === '1') itemKO++;
            }
            if(session.bilan205){
                answersBody += 'Savoir détecter et gérer les principaux effets indésirables.' + ' ' + getResultBilanSession4(session.bilan205) + '<br>';
                if(session.bilan205 === '3') itemOK++;
                if(session.bilan205 === '2') itemNOK++;
                if(session.bilan205 === '1') itemKO++;
            }
            if(session.bilan206){
                answersBody += 'Comprendre et connaître les principales interactions médicamenteuses et alimentaires associées.' + ' ' + getResultBilanSession4(session.bilan206) + '<br>';
                if(session.bilan206 === '3') itemOK++;
                if(session.bilan206 === '2') itemNOK++;
                if(session.bilan206 === '1') itemKO++;
            }
            // TITLE 2 ITEM 2
            answersBody += '<h4><font color="#D9004D">Anti-Infectieux</font></h4>';
            if(session.bilan210){
                answersBody += 'Connaître leur rôle et leur intérêt dans la prise en charge thérapeutique.' + ' ' + getResultBilanSession4(session.bilan210) + '<br>';
                if(session.bilan210 === '3') itemOK++;
                if(session.bilan210 === '2') itemNOK++;
                if(session.bilan210 === '1') itemKO++;
            }
            if(session.bilan211){
                answersBody += ' Connaître les principaux germes ou pathologies sur lesquels ces médicaments sont actifs.' + ' ' + getResultBilanSession4(session.bilan211) + '<br>';
                if(session.bilan211 === '3') itemOK++;
                if(session.bilan211 === '2') itemNOK++;
                if(session.bilan211 === '1') itemKO++;
            }
            if(session.bilan212){
                answersBody += 'Comprendre l’évolution de la stratégie thérapeutique concernant la prise en charge prophylactique, préemptive et curative.' + ' ' + getResultBilanSession4(session.bilan212) + '<br>';
                if(session.bilan212 === '3') itemOK++;
                if(session.bilan212 === '2') itemNOK++;
                if(session.bilan212 === '1') itemKO++;
            }
            if(session.bilan213){
                answersBody += 'Connaître les surveillances cliniques et biologiques.' + ' ' + getResultBilanSession4(session.bilan213) + '<br>';
                if(session.bilan213 === '3') itemOK++;
                if(session.bilan213 === '2') itemNOK++;
                if(session.bilan213 === '1') itemKO++;
            }
            if(session.bilan214){
                answersBody += 'Savoir détecter et gérer les principaux effets indésirables.' + ' ' + getResultBilanSession4(session.bilan214) + '<br>';
                if(session.bilan214 === '3') itemOK++;
                if(session.bilan214 === '2') itemNOK++;
                if(session.bilan214 === '1') itemKO++;
            }
            if(session.bilan215){
                answersBody += 'Comprendre et connaître les principales interactions médicamenteuses et alimentaires associées.' + ' ' + getResultBilanSession4(session.bilan215) + '<br>';
                if(session.bilan215 === '3') itemOK++;
                if(session.bilan215 === '2') itemNOK++;
                if(session.bilan215 === '1') itemKO++;
            }
            // TITLE 2 ITEM 3
            answersBody += '<h4><font color="#D9004D">Médicaments associés</font></h4>';
            if(session.bilan220){
                answersBody += 'Connaître leur rôle et leur intérêt dans la prise en charge thérapeutique.' + ' ' + getResultBilanSession4(session.bilan220) + '<br>';
                if(session.bilan220 === '3') itemOK++;
                if(session.bilan220 === '2') itemNOK++;
                if(session.bilan220 === '1') itemKO++;
            }
            if(session.bilan221){
                answersBody += 'Connaître les surveillances cliniques et biologiques liées à chaque médicament.' + ' ' + getResultBilanSession4(session.bilan221) + '<br>';
                if(session.bilan221 === '3') itemOK++;
                if(session.bilan221 === '2') itemNOK++;
                if(session.bilan221 === '1') itemKO++;
            }
            if(session.bilan222){
                answersBody += 'Savoir détecter et gérer les principaux effets indésirables.' + ' ' + getResultBilanSession4(session.bilan222) + '<br>';
                if(session.bilan222 === '3') itemOK++;
                if(session.bilan222 === '2') itemNOK++;
                if(session.bilan222 === '1') itemKO++;
            }
            if(session.bilan223){
                answersBody += 'Comprendre et connaître les principales interactions médicamenteuses et alimentaires associées.' + ' ' + getResultBilanSession4(session.bilan223) + '<br>';
                if(session.bilan223 === '3') itemOK++;
                if(session.bilan223 === '2') itemNOK++;
                if(session.bilan223 === '1') itemKO++;
            }
            
            // TITLE 3
            answersBody += '<h3><font color="#2196F3">3. Modalités d’utilisation des médicaments</font></h3>';
            // TITLE 3 ITEM 1
            answersBody += '<h4><font color="#D9004D">Anti-Rejets</font></h4>';
            if(session.bilan300){
                answersBody += 'Connaître les modalités de prise (respect des horaires, alimentation ...).' + ' ' + getResultBilanSession4(session.bilan300) + '<br>';
                if(session.bilan300 === '3') itemOK++;
                if(session.bilan300 === '2') itemNOK++;
                if(session.bilan300 === '1') itemKO++;
            }
            if(session.bilan301){
                answersBody += 'Connaître la conduite à tenir en cas d’oubli.' + ' ' + getResultBilanSession4(session.bilan301) + '<br>';
                if(session.bilan301 === '3') itemOK++;
                if(session.bilan301 === '2') itemNOK++;
                if(session.bilan301 === '1') itemKO++;
            }
            if(session.bilan302){
                answersBody += 'Connaître la conduite à tenir en cas de vomissements.' + ' ' + getResultBilanSession4(session.bilan302) + '<br>';
                if(session.bilan302 === '3') itemOK++;
                if(session.bilan302 === '2') itemNOK++;
                if(session.bilan302 === '1') itemKO++;
            }
            if(session.bilan303){
                answersBody += 'Connaître les règles hygiéno-diététiques associées.' + ' ' + getResultBilanSession4(session.bilan303) + '<br>';
                if(session.bilan303 === '3') itemOK++;
                if(session.bilan303 === '2') itemNOK++;
                if(session.bilan303 === '1') itemKO++;
            }
            
            // TITLE 3 ITEM 2
            answersBody += '<h4><font color="#D9004D">Anti-infectieux</font></h4>';
            if(session.bilan310){
                answersBody += 'Connaître les modalités de prise.' + ' ' + getResultBilanSession4(session.bilan310) + '<br>';
                if(session.bilan310 === '3') itemOK++;
                if(session.bilan310 === '2') itemNOK++;
                if(session.bilan310 === '1') itemKO++;
            }
            if(session.bilan311){
                answersBody += 'Connaître la durée de prise de chaque médicament.' + ' ' + getResultBilanSession4(session.bilan311) + '<br>';
                if(session.bilan311 === '3') itemOK++;
                if(session.bilan311 === '2') itemNOK++;
                if(session.bilan311 === '1') itemKO++;
            }
            // TITLE 3 ITEM 3
            answersBody += '<h4><font color="#D9004D">Médicaments associés</font></h4>';
            if(session.bilan320){
                answersBody += 'Connaître les mesures hygiéno-diététiques associées.' + ' ' + getResultBilanSession4(session.bilan320) + '<br>';
                if(session.bilan320 === '3') itemOK++;
                if(session.bilan320 === '2') itemNOK++;
                if(session.bilan320 === '1') itemKO++;
            }
            
            // TITLE 4
            answersBody += '<h3><font color="#2196F3">4. Gestion pratique de la maladie</font></h3>';
            // TITLE 4 ITEM 1
            answersBody += '<h4><font color="#D9004D">Médicaments</font></h4>';
            if(session.bilan400){
                answersBody += 'Connaître les modalités de délivrance des médicaments (pharmacie hospitalière ou d’officine).' + ' ' + getResultBilanSession4(session.bilan400) + '<br>';
                if(session.bilan400 === '3') itemOK++;
                if(session.bilan400 === '2') itemNOK++;
                if(session.bilan400 === '1') itemKO++;
            }
            if(session.bilan401){
                answersBody += 'Savoir gérer les modalités d’approvisionnement : qui, quand, quoi, où, comment.' + ' ' + getResultBilanSession4(session.bilan401) + '<br>';
                if(session.bilan401 === '3') itemOK++;
                if(session.bilan401 === '2') itemNOK++;
                if(session.bilan401 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 2
            answersBody += '<h4><font color="#D9004D">Surveillance</font></h4>';
            if(session.bilan410){
                answersBody += 'Comprendre l’intérêt d’un suivi médical régulier et connaître son rythme.' + ' ' + getResultBilanSession4(session.bilan410) + '<br>';
                if(session.bilan410 === '3') itemOK++;
                if(session.bilan410 === '2') itemNOK++;
                if(session.bilan410 === '1') itemKO++;
            }
            if(session.bilan411){
                answersBody += 'Connaître et comprendre les examens réalisés.' + ' ' + getResultBilanSession4(session.bilan411) + '<br>';
                if(session.bilan411 === '3') itemOK++;
                if(session.bilan411 === '2') itemNOK++;
                if(session.bilan411 === '1') itemKO++;
            }
            if(session.bilan412){
                answersBody += 'Savoir anticiper les venues programmées en apportant le traitement et les résultats des examens réalisés en ville.' + ' ' + getResultBilanSession4(session.bilan412) + '<br>';
                if(session.bilan412 === '3') itemOK++;
                if(session.bilan412 === '2') itemNOK++;
                if(session.bilan412 === '1') itemKO++;
            }
            if(session.bilan413){
                answersBody += 'Connaître les modalités de la surveillance biologique ambulatoire (rythme, paramètres biologiques, horaires de prise des immunosuppresseurs ...).' + ' ' + getResultBilanSession4(session.bilan413) + '<br>';
                if(session.bilan413 === '3') itemOK++;
                if(session.bilan413 === '2') itemNOK++;
                if(session.bilan413 === '1') itemKO++;
            }
            if(session.bilan414){
                answersBody += 'Comprendre l’intérêt du contrôle quotidien de la fonction ventilatoire (Spirotel®) et connaître ses modalités de réalisation.' + ' ' + getResultBilanSession4(session.bilan414) + '<br>';
                if(session.bilan414 === '3') itemOK++;
                if(session.bilan414 === '2') itemNOK++;
                if(session.bilan410 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 3
            answersBody += '<h4><font color="#D9004D">Hygiène et alimentation</font></h4>';
            if(session.bilan420){
                answersBody += 'Reconnaître les situations à risque infectieux et savoir les gérer (port de masque, alimentation protégée ...).' + ' ' + getResultBilanSession4(session.bilan420) + '<br>';
                if(session.bilan420 === '3') itemOK++;
                if(session.bilan420 === '2') itemNOK++;
                if(session.bilan420 === '1') itemKO++;
            }
            if(session.bilan421){
                answersBody += 'Connaître l’alimentation à privilégier ou à éviter.' + ' ' + getResultBilanSession4(session.bilan421) + '<br>';
                if(session.bilan421 === '3') itemOK++;
                if(session.bilan421 === '2') itemNOK++;
                if(session.bilan421 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 4
            answersBody += '<h4><font color="#D9004D">Activité physique</font></h4>';
            if(session.bilan430){
                answersBody += 'Comprendre l’intérêt d’une activité physique régulière.' + ' ' + getResultBilanSession4(session.bilan430) + '<br>';
                if(session.bilan430 === '3') itemOK++;
                if(session.bilan430 === '2') itemNOK++;
                if(session.bilan430 === '1') itemKO++;
            }
            if(session.bilan431){
                answersBody += 'Connaître les sports à privilégier ou à éviter.' + ' ' + getResultBilanSession4(session.bilan431) + '<br>';
                if(session.bilan431 === '3') itemOK++;
                if(session.bilan431 === '2') itemNOK++;
                if(session.bilan431 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 5
            answersBody += '<h4><font color="#D9004D">Grossesse / désir d’enfant</font></h4>';
            if(session.bilan440){
                answersBody += 'Comprendre l’intérêt d’une contraception « efficace ».' + ' ' + getResultBilanSession4(session.bilan440) + '<br>';
                if(session.bilan440 === '3') itemOK++;
                if(session.bilan440 === '2') itemNOK++;
                if(session.bilan440 === '1') itemKO++;
            }
            if(session.bilan441){
                answersBody += 'Comprendre l’intérêt d’informer l’équipe soignante de tout désir de grossesse.' + ' ' + getResultBilanSession4(session.bilan441) + '<br>';
                if(session.bilan441 === '3') itemOK++;
                if(session.bilan441 === '2') itemNOK++;
                if(session.bilan441 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 6
            answersBody += '<h4><font color="#D9004D">Voyages</font></h4>';
            if(session.bilan450){
                answersBody += 'Comprendre l’intérêt d’informer l’équipe soignante de tout projet de voyage.' + ' ' + getResultBilanSession4(session.bilan450) + '<br>';
                if(session.bilan450 === '3') itemOK++;
                if(session.bilan450 === '2') itemNOK++;
                if(session.bilan450 === '1') itemKO++;
            }
            
            // TITLE 4 ITEM 7
            answersBody += '<h4><font color="#D9004D">Communication</font></h4>';
            if(session.bilan460){
                answersBody += 'Comprendre l’intérêt d’informer tout professionnel de santé des traitements en cours.' + ' ' + getResultBilanSession4(session.bilan460) + '<br>';
                if(session.bilan460 === '3') itemOK++;
                if(session.bilan460 === '2') itemNOK++;
                if(session.bilan460 === '1') itemKO++;
            }
            if(session.bilan461){
                answersBody += 'Comprendre l’intérêt de signaler toute modification de traitement.' + ' ' + getResultBilanSession4(session.bilan461) + '<br>';
                if(session.bilan461 === '3') itemOK++;
                if(session.bilan461 === '2') itemNOK++;
                if(session.bilan461 === '1') itemKO++;
            }
            if(session.bilan462){
                answersBody += 'Comprendre l’intérêt de ne pas avoir recours à l’automédication, sans avis médical ou pharmaceutique.' + ' ' + getResultBilanSession4(session.bilan462) + '<br>';
                if(session.bilan462 === '3') itemOK++;
                if(session.bilan462 === '2') itemNOK++;
                if(session.bilan462 === '1') itemKO++;
            }
            if(session.bilan463){
                answersBody += 'Comprendre l’intérêt de signaler tout événement (ex : diminution de la fonction ventilatoire, infection ...).' + ' ' + getResultBilanSession4(session.bilan463) + '<br>';
                if(session.bilan463 === '3') itemOK++;
                if(session.bilan463 === '2') itemNOK++;
                if(session.bilan463 === '1') itemKO++;
            }
            
            // Set results
            body += '<br><br>';
            body += 'Nombre d\'éléments acquis : ' + '<font color="#33cd5f">' + itemOK + '</font><br>';
            body += 'Nombre d\'éléments en cours d\'acquisition : ' + '<font color="#ffc900">' + itemNOK + '</font><br>';
            body += 'Nombre d\'éléments non acquis : ' + '<font color="#ef473a">' + itemKO + '</font><br>';
            body += '<br><br>';
            
            // Set answers
            body += answersBody;
            
            return body;
        }
        
        function getResultBilanSession4(value) {
            if(value === '3'){
                return '<font color="#33cd5f">ACQUIS</font>';
            } 
            else if(value === '2'){
                return '<font color="#ffc900">EN COURS</font>';
            }
            else if(value === '1'){
                return '<font color="#ef473a">NON ACQUIS</font>';
            }
        }
        
        function getTrueFalse(value) {
            if(value === '0'){
                return 'Oui';
            } 
            else if(value === '1'){
                return 'Non';
            }
        }

    }
})();
