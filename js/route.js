var module = angular.module("MoboCafe", ['ngRoute']);

    module.config(function($routeProvider) {
            $routeProvider.
                when('/HomePage', {
                    templateUrl: 'partials/HomePage.html'
                    //controller: 'RouteController'
                }).
                when('/menu', {
                    templateUrl: 'partials/menu.html'
                   // controller: 'RouteController'
                }).
                otherwise({
                    redirectTo: '/HomePage'
                });
        });

    