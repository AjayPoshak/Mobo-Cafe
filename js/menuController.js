'use strict';
angular.module("MoboCafe")
	.controller("menuController",menuController);
	
function menuController($scope, $rootScope,$http) {
	console.log("InsideMenu Controller...");
	$scope.menuData = null;
	$scope.items = [];
	$scope.checkbox = false;
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
	$scope.checkboxSelectionEvent = function(item)
	{
		
		console.log($scope.checkbox);
		if(item.checkbox) {
			console.log("Value selected...");
			$scope.items.push(item);
		}
		else {
			console.log("Value must be deleted"+item.itemId);
			var itr = 0;
			var loc = 0;
			//Finding the location of item which should be deleted.
			for(itr=0; itr<$scope.items.length; itr++){
				if(item.itemId == $scope.items[itr].itemId) {
					loc = itr;
				}
			}
			console.log("Loc::"+loc);
			//Deleting the unchecked item from list.
			for(itr=loc; itr<$scope.items.length-1; itr++){
				$scope.items[itr] = $scope.items[itr+1];
			}
			

		}
		printItems();
	};
	function printItems() {
		var itr = 0;
		console.log("=====PRINTING========");
		console.log($scope.items.length);
		for(itr=0; itr<$scope.items.length; itr++) {
			console.log("ItemId::"+$scope.items[itr].itemId);
		}

	}
	function startApplication() {
		console.log("Starting application...");
		getMenuDetails();
	}
	startApplication();
}