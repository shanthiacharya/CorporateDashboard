'use strict';

/**
 * @ngdoc overview
 * @name dashMetricsApp
 * @description
 * # dashMetricsApp
 *
 * Main module of the application.
 */
// angular
//   .module('dashMetricsApp', []);


  angular.module('dashMetricsApp',['ui.router','d3','highcharts-ng','datatables'])
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'views/overview.html',
       controller: 'MainCtrl as main'

    })

    $stateProvider
    .state('analytics', {
      url:'/analytics',
      templateUrl: 'views/analytics.html',
      controller: 'MainCtrl as main'

    })

    $stateProvider
    .state('reports', {
      url:'/reports',
      templateUrl: 'views/reports.html',
      controller: 'MainCtrl as main'
    })



    }]);
