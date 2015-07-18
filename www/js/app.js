// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
  
  'use strict';

  var app = angular.module('starter', ['ionic', ])

  .config(function($ionicConfigProvider){
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.views.maxCache(0);
  })

  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      
      // Home Template
      .state('home', {
        url: '/home', 
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl as vm'
      })
        
      $urlRouterProvider.otherwise("/home");
      
      // Workaround to resolve angular UI-Router infinite loop bug
      // see https://github.com/marmelab/ng-admin/issues/312
      $urlRouterProvider.otherwise( function($injector) {
          var $state = $injector.get("$state");
          $state.go("home");
      });
      
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  
})();