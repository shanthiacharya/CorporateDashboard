

/**
 * @ngdoc function
 * @name dashMetricsApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the dashMetricsApp
 */

 angular.module('dashMetricsApp')
 .controller('LineGraphIssuesAverageCtrl', function($scope,$http, $timeout){
   var categories =[];
   var seriesdata =[];
   var timer;
   var stop;
   // Get the JSON data
   var refreshIssueWeekAverage = function(){
     categories.length = 0;
     seriesdata.length = 0;
     $http.get('./data/issuesaveragebyweek.json').
     success(function(data, status, headers, config) {
       $scope.data = data;
       console.log (data)
       angular.forEach(data, function(value, key){

         var xval = data[key].day;
         var yval = data[key].count;

         categories.push(xval);
         seriesdata.push(parseFloat(yval));

         var poll = function() {
           $timeout(function() {
             //update your chart
             for (var i=0, t=7; i<t; i++) {
               seriesdata[i]= Math.round(Math.random() * 100);
             }
             poll();
           }, 25*60);
         };
         poll();


       });
     }).
     error(function(data, status, headers, config) {
       // log error
     });
     stop = $timeout(refreshIssueWeekAverage, 100*60);

     $scope.title = "";

     $scope.chartConfig={
       options:{
         chart:{
           type:'line',
           // animations: Highcharts.svg,
           // inverted: false,

         },
         credits: {
           enabled: false
         },
         colors:['#09BD60'],
         title:{
           text: ''
         },
         xAxis: {
           categories:categories,
           crosshair: true,
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
         name: 'Number of Issues',

         data :seriesdata,

       }]
     };

   }

   refreshIssueWeekAverage();
   $scope.$on('$destroy', function() {
     // Make sure that the interval is destroyed too
     $timeout.cancel( timer );
     stop = undefined;
     console.log ("Cancelled Timer for analytics");
   });


 })



 .controller('DonutChartCtrl', function($scope, $http, $timeout){

   var xval,yval,i;
   var chartdata = [];
   var timer;
   var stop;

    var refreshIssueBreakDown = function(){

      chartdata.length =0;
      $http.get('./data/issuebreakdown.csv').success(function(data) {
     $scope.main = data;

     // Split the lines
     var lines = data.split('\n');

     // header line containes categories
     angular.forEach(lines, function(value, key) {

       var line =value.toString();
       var items = line.split(',');

       if (key != 0) {
         angular.forEach(items, function(item,itemNo) {
           if (itemNo == 0 && item!="" ){
             xval = item;
           }
           else if (itemNo ==1 && item!="" ){
             yval = parseFloat(item);
           }
         });
         chartdata.push ({name: xval, y: yval })
       }

       var poll = function() {
         $timeout(function() {
           //update your chart
           for (var i=0, t=5; i<t; i++) {
             chartdata[i].y= Math.round(Math.random() * 2000);
           }
           poll();
         }, 25*60);
       };
       poll();
     });

   }).
   error(function(data, status, headers, config) {
     // log error
   });
    stop = $timeout(refreshIssueBreakDown, 100*60);

   $scope.title = "";
   $scope.chartConfig = {
     options: {
       chart: {
         type: 'pie'
       },
       colors:["#455C73","#9B59B6","#BDC3C7","#26B99A","#3498DB"],
     },

     title: {
       text: ''
     },
     tooltip: {
       pointFormat: ' <b>{point.percentage:.1f}%</b>'
     },
     plotOptions: {
       pie: {
         shadow: false,
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
           enabled: true,
           format: '<b>{point.name}</b>: {point.percentage:.1f} %',
           style: {
             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
           }
         }
       }
     },
     series: [{
       colorByPoint: true,
       innerSize: '70%',
       data: chartdata

     }],

   };
   }

   refreshIssueBreakDown();
   $scope.$on('$destroy', function() {
     // Make sure that the interval is destroyed too
     $timeout.cancel( timer );
     stop = undefined;
     console.log ("Cancelled Timer for analytics");
   });

 })


 .controller('IssueByRegionBarChartCtrl', function ($scope, $http, $timeout){

   var categories = [];
   //  var seriesdata = [];
   var seriesdata = [];
   var lineNo =0;
   var timer;
   var stop;
   var refreshIssueByRegion = function(){
      categories.length =0;
      seriesdata.length =0;
     $http.get('./data/issuecountbycountry.csv').
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
             item = Math.round(Math.random() * 1000);
             seriesdata.push(parseFloat(item));

           }

         });
       }


     });

   }).
   error(function(data, status, headers, config) {
     // log error
   });
     stop = $timeout(refreshIssueByRegion, 100*60);
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
         categories:catgories,
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
       data :seriesdata,
       showInLegend: false,
     }]

   };
 }

 refreshIssueByRegion();
 $scope.$on('$destroy', function() {
   // Make sure that the interval is destroyed too
   $timeout.cancel( timer );
   stop = undefined;
   console.log ("Cancelled Timer for analytics");
 });
 });
