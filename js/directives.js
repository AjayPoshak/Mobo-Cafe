'use strict';
angular.module("MoboCafe")
	.directive('moboHeader', function(){
		console.log("Inside Header...");
		return {
			restrict: 'E',
			templateUrl : 'partials/header.html',
			controller : ''
		};
	});
angular.module("MoboCafe")
	.directive('moboFooter', function(){
		console.log("Inside Footer...");
		return {
			restrict: 'E',
			templateUrl : 'partials/footer.html',
			controller: ''
		};
});