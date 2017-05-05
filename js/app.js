//Module
var FApp = angular.module('FApp', [ 'ngRoute' ]);

var $routeProviderReference;
//Dynamic Routing 
FApp.config(function($routeProvider) {
	$routeProviderReference = $routeProvider;
	$routeProvider.when("/", {
		templateUrl : "home.html"
	})
});
//Setting Paths for Routing
FApp.run([ '$route', '$http', '$rootScope',
		function($route, $http, $rootScope) {
			$http.get("./data.json").success(function(data) {
				console.log(JSON.stringify(data))
				var iLoop = 0, currentRoute;
				for (iLoop = 0; iLoop < data.records.length; iLoop++) {
					currentRoute = data.records[iLoop];
					var routeName = "/" + currentRoute.subMenuItem;
					
					if(currentRoute.html){
					$routeProviderReference.when(routeName, {
						templateUrl : './tools/html/' + currentRoute.html,
						controller : 'scriptController'
					});
					}
				}
				$route.reload();
			});
		} ]);

//Home controller >> Always called
FApp
		.controller(
				"HomeController",
				[
						'$scope',
						'$http',
						'$location',
						'$rootScope',
						function($scope, $http, $location,$rootScope) {
							$scope.menuList = [];
							$scope.subMenuList = [];
							$scope.jsList = [];
							//Reading JSON file
							$http
									.get("./data.json")
									.success(
											function(data) {
												$rootScope.dataCheck = data;
												console.log("data"
														+ JSON.stringify(data))
												$scope.subMenuList = data.records;
												console.log('submenu : '
														+ $scope.subMenuList)
												var iLoop = 0, currentRoute;
												
												for (iLoop = 0; iLoop < data.records.length; iLoop++) {

													if ($scope.menuList.length == 0) {
														$scope.menuList
																.push(data.records[iLoop].menuItem);
														var demo = "./tools/js/"

													} else {
														if ($scope.menuList
																.indexOf(data.records[iLoop].menuItem) == -1) {
															$scope.menuList
																	.push(data.records[iLoop].menuItem);
															console
																	.log('menuList : '
																			+ $scope.menuList)

														}
													}

												}
												//Building script tags in DOM
												for (iLoop = 0; iLoop < data.records.length; iLoop++) {
													$scope.jsList
															.push(demo
																	+ data.records[iLoop].jsFile);
												
												
													console.log('JS List : '
															+ $scope.jsList);

												}

											});
							$scope.fnGoToPage = function(args) {
								$location.path('/' + args);
							}
						} ]);
FApp
.controller(
		"scriptController",
		[
				'$scope',
				'$http',
				'$location',
				'$rootScope',
				function($scope, $http, $location,$rootScope) {
					$scope.menuList = [];
					$scope.subMenuList = [];
					$scope.jsList = [];
					//Reading JSON file
					
					if($rootScope.dataCheck){
										console.log("data"
												+ JSON.stringify($rootScope.dataCheck))
												
										$scope.subMenuList = $rootScope.dataCheck.records;
										console.log('submenu : '
												+ $scope.subMenuList)
										var iLoop = 0, currentRoute;
										var hookScripts = function(url,
												src) {
											var s = document
													.createElement("script");
											s.type = "text/javascript";
											s.src = url || null;
											s.innerHTML = src || null;
											document
													.getElementsByTagName("head")[0]
													.appendChild(s);
										};
										var demo = "./tools/js/"
										//Building script tags in DOM
										for (iLoop = 0; iLoop < $rootScope.dataCheck.records.length; iLoop++) {
										
												if($rootScope.dataCheck.records[iLoop].jsFile){
													console.log('loc : '+ $location.path());
													if(('/' + $rootScope.dataCheck.records[iLoop].subMenuItem) == $location.path())
													hookScripts(demo
															+ $rootScope.dataCheck.records[iLoop].jsFile);
												}
											

										}

									};
					$scope.fnGoToPage = function(args) {
						$location.path('/' + args);
					}
				} ]);