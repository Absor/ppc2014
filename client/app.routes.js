angular.module('ppc').config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('board', {
            url: '/boards/:id',
            templateUrl: 'board/board.html',
            controller: 'BoardController',
            controllerAs: 'board'
        });
}