'use strict';

/**
 * @ngdoc function
 * @name dashMetricsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashMetricsApp
 */

 angular.module('dashMetricsApp')
 .controller('MainCtrl', function ($scope, $http,$timeout) {
   var timer;
   var stop;
   var refreshKeyMetrics = function(){
     $http.get('./data/keymetrics.json').
     success(function(data, status, headers, config) {
       $scope.main = data;

       for (var i=0, t=20; i<t; i++) {
         data.TotalIssues= Math.round(Math.random() * 2000);
         data.OpenIssues= Math.round(Math.random() * 2000);
         data.ClosedIssues= Math.round(Math.random() * 2000);
         data.ResponseTime= Math.round(Math.random() * 2000);
         data.TotalCustomers= Math.round(Math.random() * 2000);
         data.NewCustomers= Math.round(Math.random() * 2000);
       }

     }).
     error(function(data, status, headers, config) {
       // log error
     });
     stop = $timeout(refreshKeyMetrics, 10*60);
   };
   refreshKeyMetrics();
   $scope.$on('$destroy', function() {
     // Make sure that the interval is destroyed too
     $timeout.cancel( stop);
     stop = undefined;
     console.log ("Cancelled Timer for main");
   });


 })

 .controller('MapController', function($http, $scope,$timeout){

   var values =[];
   var i ;
   var valuesMin;
   var valuesMax;
   var timer;
   var stop;

   var refreshEmployeeMap = function() {
     $http.get('./data/employeepopulation.json').
     success(function(data) {
       // Populate series
       console.log ("Values length:" + data.length);
       for (i = 0; i < data.length; i++){
         data[i].value= Math.round(Math.random() * 20000);
         values.push({code: data[i].code, value: data[i].value});
       }
       //init min/max with first item
       valuesMin = values[0].value;
       valuesMax = values[0].value;
       // find the real min and max
       for(var i=0; i<=values.length-1; i++) {
         // save max of all interactions
         if (values[i].value > valuesMax) {
           valuesMax = values[i].value;
         }
         // save min of all interactions
         if (values[i].value < valuesMin) {
           valuesMin = values[i].value;
         }

       }


     }).
     error(function(data, status, headers, config) {
       // log error
     });

     stop = $timeout(refreshEmployeeMap, 100*60);
   }
   $scope.config = {
     options: {
       legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'bottom'
       },
       lang: {
         thousandsSep: ';'
       },
       colorAxis: {
         minColor: '#c4f3e9',
         maxColor: '#125749',
         startOnTick: false,
         endOnTick: false,
         min: valuesMin,
         max: valuesMax,
         minorTickInterval: 0.1,
         tickLength: 0,
       },

       plotOptions: {
         map: {
           mapData: Highcharts.maps['custom/world'],
           joinBy: ['name']
         }

       },
       mapNavigation: {
         enabled: false
       },

     },
     chartType: 'map',

     title: {
       text: ''
     },


     plotOptions: {
       map: {
         states: {
           hover: {
             enabled: false
           },
           normal: {
             animation: false
           }
         }
       }
     },

     series: [

       {
         name:'Number of Employees',
         mapData: Highcharts.maps['custom/world'],
         nullColor: 'white',
         data : values,
         joinBy: ['iso-a2', 'code'],
         states: {
           hover: {
             color: '#b4f0e3'
           }
         }
       }
     ]
   };

   refreshEmployeeMap();
   $scope.$on('$destroy', function() {
     // Make sure that the interval is destroyed too
     $timeout.cancel( timer );
     stop = undefined;
     console.log ("Cancelled Timer for main");
   });

 })
/* */
.controller('Chart2Ctrl', function ($scope, $http, $timeout){

  var timer;
  var stop;
  var categories = [];
  var seriesdata = [];
  // Get the CSV data
  var refreshCustomerCount =  function(){
    var lineNo =0;
    console.log ("Bar Chart refresh before");
    categories.length = 0;
    seriesdata.length =0;
    $http.get('./data/customercount.csv').
    success(function(data, status, headers, config) {
      $scope.main = data;
      // Split the lines
      var lines = data.split('\n');
      // header line containes categories
      angular.forEach(lines, function(value, key) {
        var line =value.toString();
        var items = line.split(',');
        if (key != 0) {
          angular.forEach(items, function(item,itemNo) {
            if (itemNo ==0 && item!="" ){
              categories.push(item);
            }
            else if (itemNo ==1 && item!="" ){
              item = Math.round(Math.random() * 2000);
              seriesdata.push(parseFloat(item));
            }
          });
        }
      });
    }).//end success
    error(function(data, status, headers, config) {
      // log error
    }); // end error

    stop = $timeout(refreshCustomerCount, 100*60);
  }// end refresh customercount
  $scope.title = "";
  $scope.chartConfig={
    options:{
      chart:{
        type:'column'
      },
      colors:['#26B99A','#E33805','#FCD217','#7437A6','#2CD1D1'],
      title:{
        text: ''
      },
      credits: {
        enabled: false
      },
      //   {
      //     data:data
      // },

      xAxis: {
        categories,
        crosshair: true
      },


      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series:[{
      name: "count",
      data :seriesdata,
      showInLegend: false,
    }]

  };

  refreshCustomerCount();

  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $timeout.cancel( timer );
    stop = undefined;
    console.log ("Cancelled Timer for main");
  }); // end scope destroy

}) // end controller





//Line Chart
.controller('LineGraphCtrl', function($scope,$http, $timeout){


  var categories =[];
  var seriesdata =[];
  var timer;
  var stop;

  var refreshIssueCount = function(){

    categories.length = 0;
    seriesdata.length =0;
    $http.get('./data/issuecountbyyear.json').
    success(function(data, status, headers, config) {
      $scope.data = data;
      angular.forEach(data, function(value, key){
        var xval = data[key].Year;
        var yval = data[key].issuecount;
        yval = Math.round(Math.random() * 200);

        categories.push(xval);
        seriesdata.push(parseFloat(yval));



      });
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    stop = $timeout(refreshIssueCount, 100*60);
  }

  $scope.title = "";

  $scope.chartConfig={
    options:{
      chart:{
        type:'area',
        // animations: Highcharts.svg,
        // inverted: false,

      },
      credits: {
        enabled: false
      },
      colors:['#26B99A','#E33805','#FCD217','#7437A6','#2CD1D1'],
      title:{
        text: ''
      },
      xAxis: {
        categories,
        crosshair: true,
        // startOnTick: true,
        // endOnTick: true,
        tickMarkPlacement: "on",
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        align: "left"
      },
      yAxis: {
        title: {
          text: 'Count'
        },

        lineWidth: 2
      },
    },
    plotOptions: {
      spline: {
        marker: {
          enable: false
        }
      }
    },
    series: [{
      name: 'Number of Customers',
      data :seriesdata,
      fillOpacity: 0.1

    }]
  };

  refreshIssueCount();
  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $timeout.cancel( timer );
    stop = undefined;
    console.log ("Cancelled Timer for main");
  });

});
