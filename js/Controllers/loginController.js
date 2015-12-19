'use strict';
angular.module("MoboCafe")
	.controller("loginController", loginController);

function loginController($scope, $rootScope, $http, $location, SessionKeeper) {
	console.log("Inside Login Controller...");
	$scope.userName = {};
	$scope.userData = null;
	$scope.errorStatus = false;
	
	$scope.loginEvent = function(){
		console.log("User Name::"+$scope.userName.user);
		$http.post('http://10.13.48.2:8080/getUser',$scope.userName)
			.then(function(response) {
				console.log(response);
				$scope.userData = response.data;
				 console.log("Type::"+$scope.userData.type+" Id::"+$scope.userName.user);
				 if($scope.userData.type == 'employee') {
					 $location.path('/menu'); 
					console.log("Logging in...User");
				 }
				 if($scope.userData.type == 'vendor') {
					 $location.path('/orderDetail'); 
					console.log("Logging in...Vendor");
				 }
				 $rootScope.current = {};
				 $rootScope.current.userData = $scope.userData;
				 SessionKeeper.save();
			})
			.catch(function(response){
				$scope.errorStatus = true;
			});
			
	};
	
	
}
