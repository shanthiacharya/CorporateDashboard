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
         $http.get('data/bricks.json').
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
  .controller('DonutChartCtrl', function($scope){
  	$scope.title = "My Daily Activities";
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
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
              data: [{
                  name: "Work",
                  y: 11
              }, {
                  name: "Eat",
                  y: 2
              }, {
                  name: "Commute",
                  y: 2
              }, {
                  name: "Watch TV",
                  y: 2
              }, {
                  name: "Sleep",
                  y: 7
              }]
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
            console.log("Data:" + data);
            // Split the lines
          var lines = data.split('\n');

          // header line containes categories
           angular.forEach(lines, function(value, key) {

            var line =value.toString();

             var items = line.split(',');
                console.log("items:" + items);
              // header line containes categories
             if (key != 0) {
                 angular.forEach(items, function(item,itemNo) {
                     console.log("item:" + item);
                     console.log("itemNo:" + itemNo);
                     if (itemNo ==0 && item!="" ){
                      categories.push(item);

                     }
                     else if (itemNo ==1 && item!="" ){

                        seriesdata.push(parseFloat(item));
                     }

                 });
             }


           });
            console.log("Cat: " + categories);
            console.log("Ser:" +seriesdata);
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
  	$scope.title = "Population of Largest U.S. Cities";
  	$scope.chartConfig={
  		options:{
  			chart:{
  				type:'column'
  			},
              colors:['#26B99A','#E33805','#FCD217','#7437A6','#2CD1D1'],
  			title: {
              	text: 'Population of Largest U.S. Cities'
          	},
            credits: {
              enabled: false
            },
          //   {
          //     data:data
          // },

  			 xAxis: {
             categories,

              // categories: [
              //     'Jan 2010',
              //     'Jan 2011',
              //     'Jan 2012',
              //     'Jan 2013',
              //     'Jan 2014'
              //
              // ],
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
  		// series: [{
      //         name: 'New York City, NY',
      //         data: [1499, 1715, 1064, 1292]
      //
      //     }, {
      //         name: 'Los Angeles, CA',
      //         data: [1836, 1788, 1985, 1934]
      //
      //     }, {
      //         name: 'Chicago, IL',
      //         data: [1489, 1388, 3193, 4114]
      //
      //     }, {
      //         name: 'Houston, TX',
      //         data: [4224, 3232, 3415, 3197]
      //
      //     }]
  	};
  })
  //chart 3
.controller('LineGraphCtrl', function($scope,$http, $timeout){
	$scope.title = "Atmosphere Temperature by Altitude";

	$scope.chartConfig={
		options:{
			chart:{
				type:'spline',
        animations: Highcharts.svg,
				inverted: false,

			},
            colors:['#09BD60'],
			title:{
				text: ''
			},
			xAxis: {
            type:'datetime',
            tickPixelInterval: 150
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
          name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                      console.log ("before:" + time);
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()*100,
                        });
                        console.log ("after:" + (time + i * 1000));
                    }
                    return data;
                }())
        }]
	};

      var poll = function() {
       $timeout(function() {
        //update your chart
        var x = (new Date()).getTime(), // current time
                               y = Math.random();
                           	$scope.chartConfig.series[0].data.push({x, y});
         poll();
       }, 1000);
        };
           poll();


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

   var mapdata = [];
  $http.get('data/geomappopulationdensity.json').
   success(function(data) {
     mapdata = data;
     console.log ("Data:" + data);
       console.log ("MapData:" + mapdata);
   }).
   error(function(data, status, headers, config) {
     // log error
  });


  // Prepare demo data
  var data = [
      {
          "hc-key": "eu",
          "value": 20
      },
      {
          "hc-key": "oc",
          "value": 1
      },
      {
          "hc-key": "af",
          "value": 2
      },
      {
          "hc-key": "as",
          "value": 3
      },
      {
          "hc-key": "na",
          "value": 4
      },
      {
          "hc-key": "sa",
          "value": 5
      }
  ];

      $scope.Mapconfig = {

          chartType: 'map',
          title: {
              text: 'Highcharts-ng map example'
          },
          title: {
              text: 'Highcharts-ng map example'
          },
          legend: {
              enabled:false
          },

          mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            stops: [
                       [0, '#EFEFFF'],
                       [0.5, Highcharts.getOptions().colors[0]],
                       [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                   ]
        },


        series: [{
          color: '#26B99A',
            data: mapdata,
            mapData: Highcharts.maps['custom/world'],
            joinBy: ['iso-a2', 'code'],
            // joinBy: 'hc-key',
            name: 'Random data',
            states: {
                hover: {
                    color: '#000000'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
            showInLegend: false
        }]
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
