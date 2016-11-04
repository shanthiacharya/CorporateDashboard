function countChecked(){"all"===checkState&&$(".bulk_action input[name='table_records']").iCheck("check"),"none"===checkState&&$(".bulk_action input[name='table_records']").iCheck("uncheck");var a=$(".bulk_action input[name='table_records']:checked").length;a?($(".column-title").hide(),$(".bulk-actions").show(),$(".action-cnt").html(a+" Records Selected")):($(".column-title").show(),$(".bulk-actions").hide())}"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="highcharts-ng"),function(){"use strict";function a(a,b,c){void 0===c&&(c=0),0>c&&(c+=a.length),0>c&&(c=0);for(var d=a.length;d>c;c++)if(c in a&&a[c]===b)return c;return-1}function b(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);return c.apply(this,a),d?d.apply(this,a):void 0}}function c(a,b){if(angular.isArray(b)){a=angular.isArray(a)?a:[];for(var d=0;d<b.length;d++)a[d]=c(a[d]||{},b[d])}else if(angular.isObject(b)){a=angular.isObject(a)?a:{};for(var e in b)a[e]=c(a[e]||{},b[e])}else a=b;return a}function d(a,b){function c(){return d}var d=a.when(b.Highcharts);return{getHighcharts:c,ready:function(a,b){c().then(function(){a.call(b)})}}}function e(d,e){function f(b,c,d,f){var g={},h=!1,k=function(b,d){var e,f=[];if(b){var j=i(b);if(j&&!c.disableDataWatch)return!1;if(angular.forEach(b,function(a,b){f.push(a.id);var c=h.get(a.id);if(c)if(angular.equals(g[a.id],o(a)))if(void 0!==a.visible&&c.visible!==a.visible&&c.setVisible(a.visible,!1),b<d.length){var e=d[b],i=angular.copy(e),j=a.data[a.data.length-1];i.data.push(j),angular.equals(i,a)?c.addPoint(j,!1):(i.data.shift(),angular.equals(i,a)?c.addPoint(j,!1,!0):c.setData(angular.copy(a.data),!1))}else c.setData(angular.copy(a.data),!1);else c.update(angular.copy(a),!1);else h.addSeries(angular.copy(a),!1);g[a.id]=o(a)}),c.config.noData){var k=!1;for(e=0;e<b.length;e++)if(b[e].data&&b[e].data.length>0){k=!0;break}k?h.hideLoading():h.showLoading(c.config.noData)}}for(e=h.series.length-1;e>=0;e--){var l=h.series[e];"highcharts-navigator-series"!==l.options.id&&a(f,l.options.id)<0&&l.remove(!1)}return!0},q=function(){h&&h.destroy(),g={};var a=c.config||{},e=l(c,d,a),f=a.func||void 0,i=p(c);h=new b[i](e,f);for(var k=0;k<j.length;k++)a[j[k]]&&n(h,a[j[k]],j[k]);a.loading&&h.showLoading(),a.getHighcharts=function(){return h}};q(),c.disableDataWatch?c.$watchCollection("config.series",function(a,b){k(a),h.redraw()}):c.$watch("config.series",function(a,b){var c=k(a,b);c&&h.redraw()},!0),c.$watch("config.title",function(a){h.setTitle(a,!0)},!0),c.$watch("config.subtitle",function(a){h.setTitle(!0,a)},!0),c.$watch("config.loading",function(a){a?h.showLoading(a===!0?null:a):h.hideLoading()}),c.$watch("config.noData",function(a){c.config&&c.config.loading&&h.showLoading(a)},!0),c.$watch("config.credits.enabled",function(a){a?h.credits.show():h.credits&&h.credits.hide()}),c.$watch(p,function(a,b){a!==b&&q()}),angular.forEach(j,function(a){c.$watch("config."+a,function(b){if(b){if(angular.isArray(b))for(var c=0;c<b.length;c++){var d=b[c];c<h[a].length&&(h[a][c].update(d,!1),m(h[a][c],angular.copy(d)))}else h[a][0].update(b,!1),m(h[a][0],angular.copy(b));h.redraw()}},!0)}),c.$watch("config.options",function(a,b,c){a!==b&&(q(),k(c.config.series),h.redraw())},!0),c.$watch("config.size",function(a,b){a!==b&&a&&h.setSize(a.width||h.chartWidth,a.height||h.chartHeight)},!0),c.$on("highchartsng.reflow",function(){h.reflow()}),c.$on("$destroy",function(){if(h){try{h.destroy()}catch(a){}e(function(){d.remove()},0)}})}function g(a,b,c){function e(d){f(d,a,b,c)}d.getHighcharts().then(e)}var h=0,i=function(a){var b=!1;return angular.forEach(a,function(a){angular.isDefined(a.id)||(a.id="series-"+h++,b=!0)}),b},j=["xAxis","yAxis"],k={stock:"StockChart",map:"Map",chart:"Chart"},l=function(a,d,f){var g={},h={chart:{events:{}},title:{},subtitle:{},series:[],credits:{},plotOptions:{},navigator:{enabled:!1},xAxis:{events:{}},yAxis:{events:{}}};return g=f.options?c(h,f.options):h,g.chart.renderTo=d[0],angular.forEach(j,function(d){angular.isDefined(f[d])&&(g[d]=c(g[d]||{},f[d]),(angular.isDefined(f[d].currentMin)||angular.isDefined(f[d].currentMax))&&(b(g.chart.events,"selection",function(b){var c=this;b[d]?a.$apply(function(){a.config[d].currentMin=b[d][0].min,a.config[d].currentMax=b[d][0].max}):a.$apply(function(){a.config[d].currentMin=c[d][0].dataMin,a.config[d].currentMax=c[d][0].dataMax})}),b(g.chart.events,"addSeries",function(b){a.config[d].currentMin=this[d][0].min||a.config[d].currentMin,a.config[d].currentMax=this[d][0].max||a.config[d].currentMax}),b(g[d].events,"setExtremes",function(b){b.trigger&&"zoom"!==b.trigger&&e(function(){a.config[d].currentMin=b.min,a.config[d].currentMax=b.max,a.config[d].min=b.min,a.config[d].max=b.max},0)})))}),f.title&&(g.title=f.title),f.subtitle&&(g.subtitle=f.subtitle),f.credits&&(g.credits=f.credits),f.size&&(f.size.width&&(g.chart.width=f.size.width),f.size.height&&(g.chart.height=f.size.height)),g},m=function(a,b){var c=a.getExtremes();(b.currentMin!==c.dataMin||b.currentMax!==c.dataMax)&&(a.setExtremes?a.setExtremes(b.currentMin,b.currentMax,!1):a.detachedsetExtremes(b.currentMin,b.currentMax,!1))},n=function(a,b,c){(b.currentMin||b.currentMax)&&a[c][0].setExtremes(b.currentMin,b.currentMax,!0)},o=function(a){return angular.extend(c({},a),{data:null,visible:null})},p=function(a){return void 0===a.config?"Chart":k[(""+a.config.chartType).toLowerCase()]||(a.config.useHighStocks?"StockChart":"Chart")};return{restrict:"EAC",replace:!0,template:"<div></div>",scope:{config:"=",disableDataWatch:"="},link:g}}angular.module("highcharts-ng",[]).factory("highchartsNG",["$q","$window",d]).directive("highchart",["highchartsNG","$timeout",e])}(),angular.module("dashMetricsApp",["ui.router","highcharts-ng","datatables"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/overview.html",controller:"MainCtrl as main"}),a.state("analytics",{url:"/analytics",templateUrl:"views/analytics.html",controller:"LineGraphIssuesAverageCtrl"}),a.state("reports",{url:"/reports",templateUrl:"views/reports.html",controller:"DatatableCtrl"})}]);var CURRENT_URL=window.location.href.split("?")[0],$BODY=$("body"),$MENU_TOGGLE=$("#menu_toggle"),$SIDEBAR_MENU=$("#sidebar-menu"),$SIDEBAR_FOOTER=$(".sidebar-footer"),$LEFT_COL=$(".left_col"),$RIGHT_COL=$(".right_col"),$NAV_MENU=$(".nav_menu"),$FOOTER=$("footer");$(document).ready(function(){var a=function(){$RIGHT_COL.css("min-height",$(window).height());var a=$BODY.outerHeight(),b=$BODY.hasClass("footer_fixed")?0:$FOOTER.height(),c=$LEFT_COL.eq(1).height()+$SIDEBAR_FOOTER.height(),d=c>a?c:a;d-=$NAV_MENU.height()+b,$RIGHT_COL.css("min-height",d)};$SIDEBAR_MENU.find("a").on("click",function(a){var b=$(this).parent();b.is(".active")?b.removeClass("active active-sm"):(b.parent().is(".child_menu")||($SIDEBAR_MENU.find("li").removeClass("active active-sm"),$SIDEBAR_MENU.find("li ul").slideUp()),b.addClass("active"))}),$MENU_TOGGLE.on("click",function(){$BODY.hasClass("nav-md")?($SIDEBAR_MENU.find("li.active ul").hide(),$SIDEBAR_MENU.find("li.active").addClass("active-sm").removeClass("active")):($SIDEBAR_MENU.find("li.active-sm ul").show(),$SIDEBAR_MENU.find("li.active-sm").addClass("active").removeClass("active-sm")),$BODY.toggleClass("nav-md nav-sm"),a()}),$SIDEBAR_MENU.find('a[href="'+CURRENT_URL+'"]').parent("li").addClass("current-page"),$SIDEBAR_MENU.find("a").filter(function(){return this.href==CURRENT_URL}).parent("li").addClass("current-page").parents("ul").slideDown(function(){a()}).parent().addClass("active"),$.fn.mCustomScrollbar&&$(".menu_fixed").mCustomScrollbar({autoHideScrollbar:!0,theme:"minimal",mouseWheel:{preventDefault:!0}})}),$(document).ready(function(){$(".collapse-link").on("click",function(){var a=$(this).closest(".x_panel"),b=$(this).find("i"),c=a.find(".x_content");a.attr("style")?c.slideToggle(200,function(){a.removeAttr("style")}):(c.slideToggle(200),a.css("height","auto")),b.toggleClass("fa-chevron-up fa-chevron-down")}),$(".close-link").click(function(){var a=$(this).closest(".x_panel");a.remove()})}),$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip({container:"body"})}),$(".progress .progress-bar")[0]&&$(".progress .progress-bar").progressbar(),$(document).ready(function(){if($(".js-switch")[0]){var a=Array.prototype.slice.call(document.querySelectorAll(".js-switch"));a.forEach(function(a){new Switchery(a,{color:"#26B99A"})})}}),$(document).ready(function(){$("input.flat")[0]&&$(document).ready(function(){$("input.flat").iCheck({checkboxClass:"icheckbox_flat-green",radioClass:"iradio_flat-green"})})}),$("table input").on("ifChecked",function(){checkState="",$(this).parent().parent().parent().addClass("selected"),countChecked()}),$("table input").on("ifUnchecked",function(){checkState="",$(this).parent().parent().parent().removeClass("selected"),countChecked()});var checkState="";$(".bulk_action input").on("ifChecked",function(){checkState="",$(this).parent().parent().parent().addClass("selected"),countChecked()}),$(".bulk_action input").on("ifUnchecked",function(){checkState="",$(this).parent().parent().parent().removeClass("selected"),countChecked()}),$(".bulk_action input#check-all").on("ifChecked",function(){checkState="all",countChecked()}),$(".bulk_action input#check-all").on("ifUnchecked",function(){checkState="none",countChecked()}),$(document).ready(function(){$(".expand").on("click",function(){$(this).next().slideToggle(200),$expand=$(this).find(">:first-child"),"+"==$expand.text()?$expand.text("-"):$expand.text("+")})}),"undefined"!=typeof NProgress&&($(document).ready(function(){NProgress.start()}),$(window).load(function(){NProgress.done()})),angular.module("dashMetricsApp").controller("MainCtrl",["$scope","$http","$timeout",function(a,b,c){var d,e=function(){b.get("./data/keymetrics.json").success(function(b,c,d,e){a.main=b;for(var f=0,g=20;g>f;f++)b.TotalIssues=Math.round(2e3*Math.random()),b.OpenIssues=Math.round(2e3*Math.random()),b.ClosedIssues=Math.round(2e3*Math.random()),b.ResponseTime=Math.round(2e3*Math.random()),b.TotalCustomers=Math.round(2e3*Math.random()),b.NewCustomers=Math.round(2e3*Math.random())}).error(function(a,b,c,d){}),d=c(e,600)};e(),a.$on("$destroy",function(){c.cancel(d),d=void 0,console.log("Cancelled Timer for main")})}]).controller("MapController",["$http","$scope","$timeout",function(a,b,c){var d,e,f,g,h=[],i=function(){a.get("./data/employeepopulation.json").success(function(a){for(console.log("Values length:"+a.length),b=0;b<a.length;b++)a[b].value=Math.round(2e4*Math.random()),h.push({code:a[b].code,value:a[b].value});d=h[0].value,e=h[0].value;for(var b=0;b<=h.length-1;b++)h[b].value>e&&(e=h[b].value),h[b].value<d&&(d=h[b].value)}).error(function(a,b,c,d){}),g=c(i,6e3)};b.config={options:{legend:{layout:"vertical",align:"left",verticalAlign:"bottom"},lang:{thousandsSep:";"},colorAxis:{minColor:"#c4f3e9",maxColor:"#125749",startOnTick:!1,endOnTick:!1,min:d,max:e,minorTickInterval:.1,tickLength:0},plotOptions:{map:{mapData:Highcharts.maps["custom/world"],joinBy:["name"]}},mapNavigation:{enabled:!1}},chartType:"map",title:{text:""},plotOptions:{map:{states:{hover:{enabled:!1},normal:{animation:!1}}}},series:[{name:"Number of Employees",mapData:Highcharts.maps["custom/world"],nullColor:"white",data:h,joinBy:["iso-a2","code"],states:{hover:{color:"#b4f0e3"}}}]},i(),b.$on("$destroy",function(){c.cancel(f),g=void 0,console.log("Cancelled Timer for main")})}]).controller("Chart2Ctrl",["$scope","$http","$timeout",function(a,b,c){var d,e,f=[],g=[],h=function(){console.log("Bar Chart refresh before"),f.length=0,g.length=0,b.get("./data/customercount.csv").success(function(b,c,d,e){a.main=b;var h=b.split("\n");angular.forEach(h,function(a,b){var c=a.toString(),d=c.split(",");0!=b&&angular.forEach(d,function(a,b){0==b&&""!=a?f.push(a):1==b&&""!=a&&(a=Math.round(2e3*Math.random()),g.push(parseFloat(a)))})})}).error(function(a,b,c,d){}),e=c(h,6e3)};a.title="",a.chartConfig={options:{chart:{type:"column"},colors:["#26B99A","#E33805","#FCD217","#7437A6","#2CD1D1"],title:{text:""},credits:{enabled:!1},xAxis:{categories:f,crosshair:!0},yAxis:{min:0,title:{text:""},stackLabels:{enabled:!0,style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"gray"}}}},plotOptions:{column:{stacking:"normal"}},series:[{name:"count",data:g,showInLegend:!1}]},h(),a.$on("$destroy",function(){c.cancel(d),e=void 0,console.log("Cancelled Timer for main")})}]).controller("LineGraphCtrl",["$scope","$http","$timeout",function(a,b,c){var d,e,f=[],g=[],h=function(){f.length=0,g.length=0,b.get("./data/issuecountbyyear.json").success(function(b,c,d,e){a.data=b,angular.forEach(b,function(a,c){var d=b[c].Year,e=b[c].issuecount;e=Math.round(200*Math.random()),f.push(d),g.push(parseFloat(e))})}).error(function(a,b,c,d){}),e=c(h,6e3)};a.title="",a.chartConfig={options:{chart:{type:"area"},credits:{enabled:!1},colors:["#26B99A","#E33805","#FCD217","#7437A6","#2CD1D1"],title:{text:""},xAxis:{categories:f,crosshair:!0,tickMarkPlacement:"on",startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,align:"left"},yAxis:{title:{text:"Count"},lineWidth:2}},plotOptions:{spline:{marker:{enable:!1}}},series:[{name:"Number of Customers",data:g,fillOpacity:.1}]},h(),a.$on("$destroy",function(){c.cancel(d),e=void 0,console.log("Cancelled Timer for main")})}]),angular.module("dashMetricsApp").controller("DatatableCtrl",["$scope","$http","DTOptionsBuilder","DTColumnDefBuilder","$timeout",function(a,b,c,d,e){var f,g,h=this;h.issues=[],h.dtOptions=c.newOptions().withPaginationType("full_numbers").withDisplayLength(25).withOption("responsive",!0),h.dtColumnDefs=[];var i=function(){b.get("./data/mockdata.json").success(function(a,b,c,d){h.issues=a,a.splice(0,Math.round(20*Math.random()))}).error(function(a,b,c,d){}),g=e(i,6e3)};i(),a.$on("$destroy",function(){e.cancel(f),g=void 0,console.log("Cancelled Timer for datatable")})}]),angular.module("dashMetricsApp").controller("LineGraphIssuesAverageCtrl",["$scope","$http","$timeout",function(a,b,c){var d,e,f=[],g=[],h=function(){f.length=0,g.length=0,b.get("./data/issuesaveragebyweek.json").success(function(b,d,e,h){a.data=b,console.log(b),angular.forEach(b,function(a,d){var e=b[d].day,h=b[d].count;f.push(e),g.push(parseFloat(h));var i=function(){c(function(){for(var a=0,b=7;b>a;a++)g[a]=Math.round(100*Math.random());i()},1500)};i()})}).error(function(a,b,c,d){}),e=c(h,6e3),a.title="",a.chartConfig={options:{chart:{type:"line"},credits:{enabled:!1},colors:["#09BD60"],title:{text:""},xAxis:{categories:f,crosshair:!0,tickMarkPlacement:"on",startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,align:"left"},yAxis:{title:{text:"Count"},lineWidth:2}},plotOptions:{spline:{marker:{enable:!1}}},series:[{name:"Number of Issues",data:g}]}};h(),a.$on("$destroy",function(){c.cancel(d),e=void 0,console.log("Cancelled Timer for analytics")})}]).controller("DonutChartCtrl",["$scope","$http","$timeout",function(a,b,c){var d,e,f,g,h=[],i=function(){h.length=0,b.get("./data/issuebreakdown.csv").success(function(b){a.main=b;var f=b.split("\n");angular.forEach(f,function(a,b){var f=a.toString(),g=f.split(",");0!=b&&(angular.forEach(g,function(a,b){0==b&&""!=a?d=a:1==b&&""!=a&&(e=parseFloat(a))}),h.push({name:d,y:e}));var i=function(){c(function(){for(var a=0,b=5;b>a;a++)h[a].y=Math.round(2e3*Math.random());i()},1500)};i()})}).error(function(a,b,c,d){}),g=c(i,6e3),a.title="",a.chartConfig={options:{chart:{type:"pie"},colors:["#455C73","#9B59B6","#BDC3C7","#26B99A","#3498DB"]},title:{text:""},tooltip:{pointFormat:" <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{shadow:!1,allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %",style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"}}}},series:[{colorByPoint:!0,innerSize:"70%",data:h}]}};i(),a.$on("$destroy",function(){c.cancel(f),g=void 0,console.log("Cancelled Timer for analytics")})}]).controller("IssueByRegionBarChartCtrl",["$scope","$http","$timeout",function(a,b,c){var d,e,f=[],g=[],h=function(){f.length=0,g.length=0,b.get("./data/issuecountbycountry.csv").success(function(b,c,d,e){a.main=b;var h=b.split("\n");angular.forEach(h,function(a,b){var c=a.toString(),d=c.split(",");0!=b&&angular.forEach(d,function(a,b){0==b&&""!=a?f.push(a):1==b&&""!=a&&(a=Math.round(1e3*Math.random()),g.push(parseFloat(a)))})})}).error(function(a,b,c,d){}),e=c(h,6e3),a.title="",a.chartConfig={options:{chart:{type:"column"},colors:["#26B99A","#E33805","#FCD217","#7437A6","#2CD1D1"],title:{text:""},credits:{enabled:!1},xAxis:{categories:catgories,crosshair:!0},yAxis:{min:0,title:{text:""},stackLabels:{enabled:!0,style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"gray"}}}},plotOptions:{column:{stacking:"normal"}},series:[{data:g,showInLegend:!1}]}};h(),a.$on("$destroy",function(){c.cancel(d),e=void 0,console.log("Cancelled Timer for analytics")})}]),angular.module("dashMetricsApp").run(["$templateCache",function(a){"use strict";a.put("views/analytics.html",'<div class="row"> <div class="col-md-6 col-sm-12 col-xs-12"> <div class="dashboard_graph" ng-controller="DonutChartCtrl as donut"> <div class="row x_title"> <div class="col-md-12"> <h2>Issues Breakdown </h2> </div> </div> <div class="col-md-12 col-sm-12 col-xs-12"> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="chartConfig"></highchart> </div> </div> <div class="clearfix"></div> </div> </div> <!---Reported Issues Bar Graph --> <div class="col-md-6 col-sm-12 col-xs-12"> <div class="dashboard_graph" ng-controller="IssueByRegionBarChartCtrl"> <div class="row x_title"> <div class="col-md-12"> <h2> Issues by Countries </h2> </div> </div> <div class="col-md-12 col-sm-9 col-xs-12"> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="chartConfig"></highchart> </div> </div> <div class="clearfix"></div> </div> </div> </div> <br> <!---  Reported Issues Line Graph----> <div class="row" ng-controller="LineGraphIssuesAverageCtrl as line"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="x_panel"> <div class="x_title"> <h2>Issue Count <small>Weekly</small></h2> <div class="clearfix"></div> </div> <!-- <div class="col-md-9 col-sm-9 col-xs-12"></div> --> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="chartConfig"></highchart> </div> </div> </div> </div>'),a.put("views/dashboard.html",'<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width,initial-scale=1"> <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> <meta name="description" content=""> <meta name="author" content=""> <link rel="icon" href="../../favicon.ico"> <title>Dashboard Template for Bootstrap</title> <!-- Bootstrap core CSS --> <link href="../../dist/css/bootstrap.min.css" rel="stylesheet"> <!-- IE10 viewport hack for Surface/desktop Windows 8 bug --> <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet"> <!-- Custom styles for this template --> <link href="dashboard.css" rel="stylesheet"> <!-- Just for debugging purposes. Don\'t actually copy these 2 lines! --> <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]--> <script src="../../assets/js/ie-emulation-modes-warning.js"></script> <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --> <!--[if lt IE 9]>\n      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>\n      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\n    <![endif]--> </head> <body> <nav class="navbar navbar-inverse navbar-fixed-top"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Project name</a> </div> <div id="navbar" class="navbar-collapse collapse"> <ul class="nav navbar-nav navbar-right"> <li><a href="#">Dashboard</a></li> <li><a href="#">Settings</a></li> <li><a href="#">Profile</a></li> <li><a href="#">Help</a></li> </ul> <form class="navbar-form navbar-right"> <input type="text" class="form-control" placeholder="Search..."> </form> </div> </div> </nav> <div class="container-fluid"> <div class="row"> <div class="col-sm-3 col-md-2 sidebar"> <ul class="nav nav-sidebar"> <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li> <li><a href="#">Reports</a></li> <li><a href="#">Analytics</a></li> <li><a href="#">Export</a></li> </ul> <ul class="nav nav-sidebar"> <li><a href="">Nav item</a></li> <li><a href="">Nav item again</a></li> <li><a href="">One more nav</a></li> <li><a href="">Another nav item</a></li> <li><a href="">More navigation</a></li> </ul> <ul class="nav nav-sidebar"> <li><a href="">Nav item again</a></li> <li><a href="">One more nav</a></li> <li><a href="">Another nav item</a></li> </ul> </div> <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> <h1 class="page-header">Dashboard</h1> <div class="row placeholders"> <div class="col-xs-6 col-sm-3 placeholder"> <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail"> <h4>Label</h4> <span class="text-muted">Something else</span> </div> <div class="col-xs-6 col-sm-3 placeholder"> <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail"> <h4>Label</h4> <span class="text-muted">Something else</span> </div> <div class="col-xs-6 col-sm-3 placeholder"> <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail"> <h4>Label</h4> <span class="text-muted">Something else</span>v </div> <div class="col-xs-6 col-sm-3 placeholder"> <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail"> <h4>Label</h4> <span class="text-muted">Something else</span> </div> </div> <h2 class="sub-header">Section title</h2> <div class="table-responsive"> <table class="table table-striped"> <thead> <tr> <th>#</th> <th>Header</th> <th>Header</th> <th>Header</th> <th>Header</th> </tr> </thead> <tbody> <tr> <td>1,001</td> <td>Lorem</td> <td>ipsum</td> <td>dolor</td> <td>sit</td> </tr> <tr> <td>1,002</td> <td>amet</td> <td>consectetur</td> <td>adipiscing</td> <td>elit</td> </tr> <tr> <td>1,003</td> <td>Integer</td> <td>nec</td> <td>odio</td> <td>Praesent</td> </tr> <tr> <td>1,003</td> <td>libero</td> <td>Sed</td> <td>cursus</td> <td>ante</td> </tr> <tr> <td>1,004</td> <td>dapibus</td> <td>diam</td> <td>Sed</td> <td>nisi</td> </tr> <tr> <td>1,005</td> <td>Nulla</td> <td>quis</td> <td>sem</td> <td>at</td> </tr> <tr> <td>1,006</td> <td>nibh</td> <td>elementum</td> <td>imperdiet</td> <td>Duis</td> </tr> <tr> <td>1,007</td> <td>sagittis</td> <td>ipsum</td> <td>Praesent</td> <td>mauris</td> </tr> <tr> <td>1,008</td> <td>Fusce</td> <td>nec</td> <td>tellus</td> <td>sed</td> </tr> <tr> <td>1,009</td> <td>augue</td> <td>semper</td> <td>porta</td> <td>Mauris</td> </tr> <tr> <td>1,010</td> <td>massa</td> <td>Vestibulum</td> <td>lacinia</td> <td>arcu</td> </tr> <tr> <td>1,011</td> <td>eget</td> <td>nulla</td> <td>Class</td> <td>aptent</td> </tr> <tr> <td>1,012</td> <td>taciti</td> <td>sociosqu</td> <td>ad</td> <td>litora</td> </tr> <tr> <td>1,013</td> <td>torquent</td> <td>per</td> <td>conubia</td> <td>nostra</td> </tr> <tr> <td>1,014</td> <td>per</td> <td>inceptos</td> <td>himenaeos</td> <td>Curabitur</td> </tr> <tr> <td>1,015</td> <td>sodales</td> <td>ligula</td> <td>in</td> <td>libero</td> </tr> </tbody> </table> </div> </div> </div> </div> </body> </html>'),a.put("views/overview.html",'<div class="row tile_count" data-ng-controller="MainCtrl as main"> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-user"></i> Total Issues</span> <div class="count">{{main.TotalIssues}}</div> </div> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-user"></i> Open Issues</span> <div class="count green">{{main.OpenIssues}}</div> </div> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-user"></i> Closed Issues</span> <div class="count">{{main.ClosedIssues}}</div> </div> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-clock-o"></i> Response Time </span> <div class="count">{{main.ResponseTime}}</div> </div> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-user"></i> Total Customers</span> <div class="count">{{main.TotalCustomers}}</div> </div> <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count"> <span class="count_top"><i class="fa fa-user"></i> New Customers</span> <div class="count">{{main.NewCustomers}}</div> </div> </div> <!---   Map ----> <div class="row" data-ng-controller="MapController"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="row"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="x_panel"> <div class="x_title"> <h2>Employee Location <small>geo-presentation</small></h2> <div class="clearfix"></div> </div> <div class="col-md-12 col-sm-12 col-xs-12"> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div id="mycontainer" style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="config"></highchart> </div> </div> </div> </div> </div> </div> <!---  Reported Issues Line Graph----> <div class="col-md-12 col-sm-12 col-xs-12" ng-controller="LineGraphCtrl as donut"> <div class="row"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="x_panel"> <div class="x_title"> <h2>Paying Customers <small>2016</small></h2> <ul class="nav navbar-right panel_toolbox"> <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a> </li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a> <ul class="dropdown-menu" role="menu"> <li><a href="#">Settings 1</a> </li> <li><a href="#">Settings 2</a> </li> </ul> </li> <li><a class="close-link"><i class="fa fa-close"></i></a> </li> </ul> <div class="clearfix"></div> </div> <!-- <div class="col-md-9 col-sm-9 col-xs-12"></div> --> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="chartConfig"></highchart> </div> </div> </div> </div> </div> </div> <!---Reported Issues Bar Graph --> <div class="row"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="dashboard_graph" ng-controller="Chart2Ctrl"> <div class="row x_title"> <div class="col-md-6"> <h3>Reported Issues <small>count</small></h3> </div> </div> <div class="col-md-12 col-sm-9 col-xs-12"> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <!-- <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div> --> <highchart config="chartConfig" id="linechart"></highchart> </div> </div> <div class="clearfix"></div> </div> </div> </div> <br>'),a.put("views/reports.html",'<div class="row"> <div class="col-md-12 col-sm-12 col-xs-12"> <div class="dashboard_graph" ng-controller="DatatableCtrl as showCase"> <div class="row x_title"> <div class="col-md-6"> <h3>Watch List <small>Top issues</small></h3> </div> </div> <div class="col-md-12 col-sm-12 col-xs-12"> <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div> <div style="width: 100%"> <table datatable="ng" dt-options="showCase.dtOptions" dt-column-defs="showCase.dtColumnDefs" class="row-border hover"> <thead> <tr> <th>Submitted Time</th> <th>Customer</th> <th>Customer Email</th> <th>Description</th> <th>Status</th> <th>Closed Time</th> <th>Employee Name </th> </tr> </thead> <tbody> <tr ng-repeat="issues in showCase.issues"> <td>{{ issues["Submission timestamp"] }}</td> <td>{{issues["Customer name"] }}</td> <td>{{ issues["Customer email address"] }}</td> <td>{{ issues["Description"] }}</td> <td>{{ issues["Status"] }}</td> <td>{{ issues["Closed timestamp"] }}</td> <td>{{ issues["Employee name"] }}</td> </tr> </tbody> </table> </div> </div> <div class="clearfix"></div> </div> </div> </div>')}]);