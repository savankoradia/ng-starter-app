angular.module('app.pages', ['ui.router'])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('pages', {
                url: '/',
                templateUrl: 'dist/views/pages/page.html',
                controller: 'PagesController',
                pageTitle: 'Home Page',
                data: {}
            });
    }]).controller('PagesController', ['$scope', '$state', function ($scope, $state) {
      $scope.data = "Welcome to Starter App Page.";
    }]);
