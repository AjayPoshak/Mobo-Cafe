'use strict';
angular.module("MoboCafe")
	.controller("menuController",menuController);

function menuController($scope, $rootScope,$http) {
	console.log("InsideMenu Controller...");
	$scope.menuData = null;
	$scope.items = [];
	$scope.checkbox = false;
	$scope.total = 0; //Grand Total Price
	$scope.isDisabled = true; //To disable the checkout button until total is greater than zero.
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
			console.log("Loc::"+loc+"Length::"+$scope.items.length);
			//Deleting the unchecked item from list.
			for(itr=loc; itr<$scope.items.length-1; itr++){
				$scope.items[itr] = $scope.items[itr+1];
			}
			$scope.items.length = $scope.items.length-1;

		}
		countTotal();
		//printItems();
	};
	function printItems() {
		var itr = 0;
		console.log("=====PRINTING========");
		console.log($scope.items.length);
		for(itr=0; itr<$scope.items.length; itr++) {
			console.log("ItemId::"+$scope.items[itr].itemId);
		}

	}
	function countTotal() {
		var itr = 0;
		var total = 0;
		for(itr=0; itr< $scope.items.length; itr++){
			console.log("Q::"+$scope.items[itr].quantity+" P::"+$scope.items[itr].price);
			total = total + ($scope.items[itr].quantity * $scope.items[itr].price);
		};
		$scope.total = total;
		console.log("+++Total::"+$scope.total);
		if($scope.total > 0){
			$scope.isDisabled = false;
			console.log("Button Enabled");
		}
		else {
			$scope.isDisabled = true;
		}
	};
	$scope.updateQuantity = function(param){
		//Finding the location of item whose quantity should be updated.
		var itr = 0;
		var loc = 0;
		for(itr=0; itr<$scope.items.length; itr++){
			if(param.itemId == $scope.items[itr].itemId) {
				loc = itr;
			}
			if($scope.total > 0){
				$scope.isDisabled = false;
			}
			else {
				$scope.isDisabled = true;
			}
		}
		console.log("Quality updated::"+ param.quantity);
		$scope.items[loc].quantity = param.quantity;
		countTotal();
	};
	$scope.checkoutOrder = function() {
		console.log("Checking out the order...");
		printItems();
	}
	function startApplication() {
		console.log("Starting application...");
		getMenuDetails();
	}
	startApplication();
}
