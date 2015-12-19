'use strict';
angular.module("MoboCafe")
	.controller("orderDetailController", orderDetailController);

function orderDetailController($scope, $rootScope, $http, $location, SessionKeeper) {
	console.log("Payment Success!!!!");
	$rootScope.current = SessionKeeper.read();
	var info = {};
	info.vendorid = $rootScope.current.userData.results[0].vendorid;
	function displayOrder() {
		$http.post('http://10.13.48.2:8080/getVendorOrderDetails', info)
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
			$http.post('http://10.13.48.2:8080/getVendorDetails', info)
			.then(function(response) {
				console.log(response);
				$scope.vendorData = response.data;
				console.log("menuData::"+$scope.vendorData[0].shopname);
				$scope.vendorName = $scope.vendorData[0].shopname
			})
			.catch(function(response){
				$scope.errorStatus= true;
				$scope.errorMessage = 'Menu Details not getting';
				console.log($scope.errorMessage);
			});
	};
	displayOrder();
	
}
