'use strict';

/**
 * @ngdoc function
 * @name dashMetricsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashMetricsApp
 */

 angular.module('dashMetricsApp')
   .controller('MainCtrl', function ($scope, $http) {
         // Hard coded data
         $http.get('data/keymetrics.json').
          success(function(data, status, headers, config) {
            $scope.main = data;
          }).
          error(function(data, status, headers, config) {
            // log error
      });

      $scope.chartTypes = [
   {"id": "line", "title": "Line"},
   {"id": "spline", "title": "Smooth line"},
   {"id": "area", "title": "Area"},
   {"id": "areaspline", "title": "Smooth area"},
   {"id": "column", "title": "Column"},
   {"id": "bar", "title": "Bar"},
   {"id": "pie", "title": "Pie"},
   {"id": "scatter", "title": "Scatter"}
 ];

 $scope.dashStyles = [
   {"id": "Solid", "title": "Solid"},
   {"id": "ShortDash", "title": "ShortDash"},
   {"id": "ShortDot", "title": "ShortDot"},
   {"id": "ShortDashDot", "title": "ShortDashDot"},
   {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
   {"id": "Dot", "title": "Dot"},
   {"id": "Dash", "title": "Dash"},
   {"id": "LongDash", "title": "LongDash"},
   {"id": "DashDot", "title": "DashDot"},
   {"id": "LongDashDot", "title": "LongDashDot"},
   {"id": "LongDashDotDot", "title": "LongDashDotDot"}
 ];

 $scope.chartSeries = [
   {"name": "Some data", "data": [1, 2, 4, 7, 3]},
   {"name": "Some data 3", "data": [3, 1, null, 5, 2], connectNulls: true},
   {"name": "Some data 2", "data": [5, 2, 2, 3, 5], type: "column"},
   {"name": "My Super Column", "data": [1, 1, 2, 3, 2], type: "column"}
 ];

 $scope.chartStack = [
   {"id": '', "title": "No"},
   {"id": "normal", "title": "Normal"},
   {"id": "percent", "title": "Percent"}
 ];

 $scope.addPoints = function () {
   var seriesArray = $scope.chartConfig.series;
   var rndIdx = Math.floor(Math.random() * seriesArray.length);
   seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
 };

 $scope.addSeries = function () {
   var rnd = []
   for (var i = 0; i < 10; i++) {
     rnd.push(Math.floor(Math.random() * 20) + 1)
   }
   $scope.chartConfig.series.push({
     data: rnd
   })
 }

 $scope.removeRandomSeries = function () {
   var seriesArray = $scope.chartConfig.series;
   var rndIdx = Math.floor(Math.random() * seriesArray.length);
   seriesArray.splice(rndIdx, 1)
 }

 $scope.removeSeries = function (id) {
   var seriesArray = $scope.chartConfig.series;
   seriesArray.splice(id, 1)
 }

 $scope.toggleHighCharts = function () {
   this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks
 }

 $scope.replaceAllSeries = function () {
   var data = [
     { name: "first", data: [10] },
     { name: "second", data: [3] },
     { name: "third", data: [13] }
   ];
   $scope.chartConfig.series = data;
 };

 $scope.chartConfig = {
   options: {
     chart: {
       type: 'areaspline'
     },
     plotOptions: {
       series: {
         stacking: ''
       }
     }
   },
   series: $scope.chartSeries,
   title: {
     text: 'Hello'
   },
   credits: {
     enabled: false
   },
   loading: false,
   size: {}
 }

 $scope.reflow = function () {
   $scope.$broadcast('highchartsng.reflow');
 };

  })
  .controller('DonutChartCtrl', function($scope, $http, $timeout){

   var xval,yval,i;
   var chartdata = [];
    $http.get('data/issuebreakdown.csv').
    success(function(data) {
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
     });

    }).
    error(function(data, status, headers, config) {
      // log error
   });


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
  })
  .controller('Chart2Ctrl', function ($scope, $http, $timeout){

    var categories = [];
  //  var seriesdata = [];
    var seriesdata = [];
    var lineNo =0;
          $http.get('data/customercount.csv').
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
                       seriesdata.push(parseFloat(item));
                     }

                 });
             }


           });
            // console.log("Cat: " + categories);
            // console.log("Ser:" +seriesdata);
            var poll = function() {
             $timeout(function() {
              //update your chart
              for (var i=0, t=12; i<t; i++) {
                    seriesdata[i]= Math.round(Math.random() * 2000);
                  }
               poll();
             }, 100*60);
              };
                 poll();
       }).
           error(function(data, status, headers, config) {
             // log error
       });
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
            data :seriesdata,
            showInLegend: false,
          }]

  	};
  })



  //Line Chart
.controller('LineGraphCtrl', function($scope,$http, $timeout){


    var categories =[];
    var seriesdata =[];
 // Get the JSON data
        $http.get('data/issuecountbymonth.json').
         success(function(data, status, headers, config) {
         $scope.data = data;
         angular.forEach(data, function(value, key){
             var xval = data[key].Month;
             var yval = data[key].issuecount;
             console.log("Month:" + xval);
             console.log("Count:" + yval);

            //  xaxisdata.push(xval);
            //  yaxisdata.push(yval);
             categories.push(xval);
             seriesdata.push(parseFloat(yval));
             console.log("Issues Data:" + seriesdata);
          });
          }).
         error(function(data, status, headers, config) {
           // log error
      });


	$scope.title = "";

	$scope.chartConfig={
		options:{
			chart:{
				type:'line',
        // animations: Highcharts.svg,
				// inverted: false,

			},
      colors:['#09BD60'],
			title:{
				text: ''
			},
			xAxis: {
        categories,
       crosshair: true
        	},
        	yAxis: {
            title: {
                text: 'Count'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value + '°';
            //     }
            // },
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
          // xAxis: 0,
          data :seriesdata,
          // data :
          // [[1368835200000, 2.9], [1371513600000, 0.5], [1374105600000, 1.94], [1376784000000, 1.44], [1379462400000, 1.18]],

                // data: (function () {
                //     // generate an array of random data
                //     var data = [],
                //         time = (new Date()).getTime(),
                //         i;
                //
                //     for (i = -19; i <= 0; i += 1) {
                //       //console.log ("before:" + time);
                //         data.push({
                //             x: time + i * 1000,
                //             y: Math.random()*100,
                //         });
                //       //  console.log ("after:" + (time + i * 1000));
                //     }
                //     return data;
                // }())
        }]
	};

      // var poll = function() {
      //  $timeout(function() {
      //   //update your chart
      //   var x = (new Date()).getTime(), // current time
      //                          y = Math.random();
      //                      	$scope.chartConfig.series[0].data.push({x, y});
      //    poll();
      //  }, 1000);
      //   };
      //      poll();


})
//chart 4
.controller('Chart4Ctrl', function($scope){
	$scope.title = "Fruits Consumption";
	$scope.chartConfig={
		options:{
			chart:{
				type:'column'
			},
            colors:['#04B2C9','#F78A74','#D9E84F'],
			title:{
				text:""
			},
			xAxis: {
            	categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        	},
        	yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
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
		series: [{
            name: 'Senthil',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Surya',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Swasthika',
            data: [3, 4, 4, 2, 5]
        }]
	};
})
.controller('MapController', function($http, $scope){

var values =[];
var i ;
var valuesMin;
var valuesMax;

    $http.get('data/employeepopulation.json').
    success(function(data) {

      // console.log ("Data:" + data);
      // Populate series
                    for (i = 0; i < data.length; i++){
                        values.push({code: data[i].code, value: data[i].value});
                    }
                    // console.log ("Values:" + values);
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
                      // console.log ("Maximum :" + valuesMax);
                      // console.log ("Minimum :" + valuesMin);

                    }


    }).
    error(function(data, status, headers, config) {
      // log error
   });

  $scope.config = {


      options: {
          legend: {
              enabled: false
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


})

.controller('DatatableCtrl', function ($http, DTOptionsBuilder, DTColumnDefBuilder) {
  var vm = this;
  vm.issues = [];
  vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
  vm.dtColumnDefs = [


    // DTColumnDefBuilder.newColumnDef(2).withOption('className', 'text-right'),
      // DTColumnDefBuilder.newColumnDef(0),
      // DTColumnDefBuilder.newColumnDef(1).notVisible(),
      // DTColumnDefBuilder.newColumnDef(2).notSortable()
  ];
  // $resource('data.json').query().$promise.then(function(persons) {
  //     vm.persons = persons;
  //  });
   $http.get('data/mockdata.json').
    success(function(issues, status, headers, config) {
      vm.issues = issues;
    }).
    error(function(data, status, headers, config) {
      // log error
   });

});
