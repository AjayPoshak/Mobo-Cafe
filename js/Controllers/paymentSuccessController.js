'use strict';
angular.module("MoboCafe")
	.controller("paymentSuccessController", paymentSuccessController);

function paymentSuccessController($scope, $rootScope, $http, $location, SessionKeeper) {
	console.log("Payment Success!!!!");
	$rootScope.current = SessionKeeper.read();
	$scope.items = $rootScope.current.items;
	var info = {};
	info.empid = $rootScope.current.userData.results[0].empid;
	console.log($rootScope.current.userData.results[0].empid);
	function displayOrder() {
		$http.post('http://10.13.48.2:8080/getCustomerOrderDetails', info)
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
	displayOrder();
	
}
