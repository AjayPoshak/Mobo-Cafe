'use strict';
angular.module("MoboCafe")
	.controller("vendorController", vendorController);

function vendorController($scope, $rootScope, $http, $location, SessionKeeper) {
	console.log("Vendor...	");
	$rootScope.current = SessionKeeper.read();
	$scope.orderData = [];
	var vendor = {};
	console.log("Vendor Id::"+$rootScope.current.userData.results[0].vendorid);
	vendor.vendorid = $rootScope.current.userData.results[0].vendorid;
	function displayOrder() {
		$http.post('http://10.13.48.2:8080/getVendorInventory', vendor)
			.then(function(response) {
				console.log(response);
				$scope.orderData = response.data;
				console.log("menuData::"+$scope.orderData);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
			
	};
	$scope.addRowEvent = function(){
			$scope.orderData[$scope.orderData.length] = {"vendorId": $rootScope.current.userData.results[0].vendorid,"itemId": null, "itemName": null, "itemDescription": null,"quantity": 0,
			"cost": 0};
			var itr = 0;
			console.log("Length::"+$scope.orderData.length);
			for(itr = $scope.orderData.length-1; itr >= 0; itr--) {
				console.log("itr::"+itr);
				$scope.orderData[itr] = $scope.orderData[itr-1];
			}
			$scope.orderData[0] = {"vendorId": $rootScope.current.userData.results[0].vendorid,"itemId": null, "itemName": null, "itemDescription": null,"quantity": 0,
			"cost": 0};
			console.log("New Length::"+$scope.orderData.length);
			
		}
		$scope.removeRowEvent = function(index){
			console.log("Removing the row::"+index);
			var itr = 0;
			for(itr=index; itr < $scope.orderData.length; itr++) {
				$scope.orderData[itr] = $scope.orderData[itr+1];
			}
			$scope.orderData.length = $scope.orderData.length - 1;
			console.log("Length of testSteps::"+$scope.orderData.length+" Array::"+$scope.orderData);
			
		}
		$scope.saveDataEvent = function(){
			console.log("Saving the data...");
			$http.get('http://10.13.48.2:8080/getMaxOrderId')
			.then(function(response) {
				console.log(response);
				$scope.orderId = response.data;
				console.log("menuData::"+$scope.orderId);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
			var itr = 0;
			for(itr=0;itr < $scope.orderData.length; itr++)
			{
				$scope.orderData[itr].orderId = $scope.orderId + 1;
				$scope.orderId++;
			}
			$http.post('http://10.13.48.2:8080/getVendorInventory', vendor)
			.then(function(response) {
				console.log(response);
				$scope.orderData = response.data;
				console.log("menuData::"+$scope.orderData);
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
			
			
		}
		$scope.changeEntry = function(order, index){
			console.log("Changing the data...");
			$scope.orderData[index].itemName = order.itemName;
			$scope.orderData[index].quantity = order.quantity;
			$scope.orderData[index].cost = order.cost;
			
		}
	displayOrder();
	
}
