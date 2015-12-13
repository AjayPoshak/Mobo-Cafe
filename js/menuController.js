'use strict';
angular.module("MoboCafe")
	.controller("menuController",menuController);
	
function menuController($scope, $rootScope,$http) {
	console.log("InsideMenu Controller...");
	$scope.menuData = null;
	function getMenuDetails() {
		$http.get('json/menu.json')
			.then(function(response) {
				console.log(response);
				$scope.menuData = response.data;
				console.log("menuData::"+$scope.menuData.itemList);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
			});
	}
	$scope.checkboxSelectionEvent = function()
	{
		console.log("Checkbox Selected...");
	};
	function startApplication() {
		console.log("Starting application...");
		getMenuDetails();
	}
	startApplication();
}