var module = angular.module("MoboCafe", ['ngRoute','moboSessionKeeper']);

    module.config(function($routeProvider) {
		console.log("Inside route...");
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/login.html',
                    controller: 'loginController'
                }).
                when('/menu', {
                    templateUrl: 'partials/menu.html',
                    controller: 'menuController'
                }).
				when('/paymentSuccess', {
                    templateUrl: 'partials/paymentSuccess.html',
                    controller: 'paymentSuccessController'
                }).
				when('/vendor', {
                    templateUrl: 'partials/Vendor.html',
                    controller: 'vendorController'
                }).
				when('/orderDetail', {
                    templateUrl: 'partials/orderDetail.html',
                    controller: 'orderDetailController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        });

    