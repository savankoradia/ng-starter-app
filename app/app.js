'use strict';
var starterApp = angular.module('starterApp', [
    'app.config', 'ui.router', 'angular-storage', 'app.pages'
]);

starterApp.config(['$urlRouterProvider', '$httpProvider', 'config',
    function ($urlRouterProvider, $httpProvider, config) {

        $urlRouterProvider.otherwise('/');

    }]).controller('AppController', ['$scope', function ($scope) {
    }]);
