// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
  
  'use strict';

  var app = angular.module('starter', ['ionic', 'LocalForageModule', 'ngDragDrop'])

  .config(function($ionicConfigProvider){
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.views.maxCache(0);
  })

  .config(function($stateProvider, $urlRouterProvider, $localForageProvider, $compileProvider) {
      $stateProvider
      
      // Home Template
      .state('home', {
        url: '/home', 
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl as vm'
      })

      // List Patient
      .state('list_patients', {
        url: '/list_patients', 
        templateUrl: 'templates/list_patients.html',
        controller: 'ListPatientsCtrl as vm'
      })

      // View Patient
      .state('view_patient', {
        url: '/view_patient/:patientId', 
        templateUrl: 'templates/view_patient.html',
        controller: 'ViewPatientCtrl as vm'
      })
      
      // Choice session
      .state('choice_session', {
        url: '/choice_session/:patientId', 
        templateUrl: 'templates/choice_session.html',
        controller: 'ChoiceSessionCtrl as vm'
      })
      
      // Display prescription
      .state('display_prescription', {
        url: '/display_prescription/:patientId', 
        templateUrl: 'templates/display_prescription.html',
        controller: 'DisplayPrescriptionCtrl as vm'
      })
      
      // Anti Reject prescription
      .state('antireject_prescription', {
        url: '/antireject_prescription/:patientId', 
        templateUrl: 'templates/antireject_prescription.html',
        controller: 'AntiRejectPrescriptionCtrl as vm'
      })
      
      // Anti Infection prescription
      .state('antiinfection_prescription', {
        url: '/antiinfection_prescription/:patientId', 
        templateUrl: 'templates/antiinfection_prescription.html',
        controller: 'AntiInfectionPrescriptionCtrl as vm'
      })
      
      // Other prescription
      .state('other_prescription', {
        url: '/other_prescription/:patientId', 
        templateUrl: 'templates/other_prescription.html',
        controller: 'OtherPrescriptionCtrl as vm'
      })
      
      // Seance_1
      .state('session_1', {
        url: '/session_1/:patientId/:sessionId/:alreadyDone', 
        templateUrl: 'templates/sessions/session_1.html',
        controller: 'Session1Ctrl as vm'
      })
      
      // Seance_2
      .state('session_2', {
        url: '/session_2/:patientId/:sessionId/:alreadyDone', 
        templateUrl: 'templates/sessions/session_2.html',
        controller: 'Session2Ctrl as vm'
      })
      
      // Seance_3
      .state('session_3', {
        url: '/session_3/:patientId/:sessionId/:alreadyDone', 
        templateUrl: 'templates/sessions/session_3.html',
        controller: 'Session3Ctrl as vm'
      })
      
      // Seance_4
      .state('session_4', {
        url: '/session_4/:patientId/:sessionId/:alreadyDone', 
        templateUrl: 'templates/sessions/session_4.html',
        controller: 'Session4Ctrl as vm'
      })
        
        
      $urlRouterProvider.otherwise("/home");
      
      // Workaround to resolve angular UI-Router infinite loop bug
      // see https://github.com/marmelab/ng-admin/issues/312
      $urlRouterProvider.otherwise( function($injector) {
          var $state = $injector.get("$state");
          $state.go("home");
      });
      
      // Configure localforage provider
      $localForageProvider.config({name : 'pfDatabase', storeName : 'patients'});
      
      // blob: urls have to be explicitly allowed in AngularJS
      // http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
      
  })

  .run(function($ionicPlatform, pfUtilsService) {
   
      
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
          StatusBar.styleDefault();
      }
        
      ionic.Platform.isFullScreen = true
      
       //cordova.plugins.Keyboard.disableScroll(true); 
      
      $( "#id_button_home" ).click(function() {
          pfUtilsService.popupBackHome('home');
      });
        
      $( "#id_button_list" ).click(function() {
          pfUtilsService.popupBackHome('list_patients');
      });
        
    });
  })

  
})();