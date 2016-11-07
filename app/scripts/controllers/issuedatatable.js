

/**
 * @ngdoc function
 * @name dashMetricsApp.controller:DatatableCtrl
 * @description
 * # DatatableCtrl
 * Issues Data table Controller of the dashMetricsApp
 */

 angular.module('dashMetricsApp')
.controller('DatatableCtrl', function ($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, $timeout) {
  var timer;
  var stop;
  var vm = this;
  vm.issues = [];
  vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(25).withOption('responsive', true);

  vm.dtColumnDefs = [
    // DTColumnDefBuilder.newColumnDef(2).withOption('className', 'text-right'),
      // DTColumnDefBuilder.newColumnDef(0),
      // DTColumnDefBuilder.newColumnDef(1).notVisible(),
      // DTColumnDefBuilder.newColumnDef(2).notSortable()
  ];

     var refreshIssueDataTable = function(){
        $http.get('./data/mockdata.json').
        success(function(issues, status, headers, config) {
           vm.issues = issues;
           issues.splice(0, Math.round(Math.random() * 20));

        }).
        error(function(data, status, headers, config) {
          // log error
       });
         stop = $timeout(refreshIssueDataTable, 100*60);
     }

     refreshIssueDataTable();

     $scope.$on('$destroy', function() {
       // Make sure that the interval is destroyed too
      $timeout.cancel( stop );
      stop = undefined;
      console.log ("Cancelled Timer for datatable");
    }); // end scope destroy

});
