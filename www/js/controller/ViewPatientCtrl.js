(function() {
    'use strict';
	
	angular.module('starter')

	/* 
	 * CONTROLLER ViewPatientCtrl
	 * Page : view_patient.html
	 * Goal : Managing View and creation of patient
	 */
	
	.controller('ViewPatientCtrl', ViewPatientCtrl);
	
	ViewPatientCtrl.$inject = ['$state', '$scope',
		               ];

	/* @ngInject */
	function ViewPatientCtrl($state, $scope) {

		var vm = this;
        
        // Date of the day
        var now = new Date();
        vm.dateNow = new Date(now.getFullYear(), now.getMonth() , now.getDate());
        
        // Comments
        vm.listComments = [];
        
        /*
         * COMMENTS
         * Functions to manage comments
         */
        vm.addComment = function(comment) {
        	if (comment !== undefined){
        		vm.listComments.push(
                    new Object({
                		"text": comment
                	})
                );
        		
                // we remove content of input
                vm.new_comment = undefined;
        	}
		}
        
        vm.removeComment = function(idToDelete) {
			vm.listComments.splice(idToDelete, 1);
		} 
	}

})();