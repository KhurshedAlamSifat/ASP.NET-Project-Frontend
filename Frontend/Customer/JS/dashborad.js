var app = angular.module("my-app",[]);
    app.factory('interceptor',[function(){
			var interceptor = {
				request:function(config){
					config.headers.Authorization = localStorage.getItem("tkey");
					return config;
				},
				response:function(response){
					return response;
				}
			};
			return interceptor;
		}]);
		
		app.config(function($httpProvider){
			$httpProvider.interceptors.push('interceptor');
		});
		app.controller('CustomerCtrl',function($scope,$http){
			$http.get("https://localhost:44358/api/customers/"+localStorage.getItem("user")).then(function(resp){
			debugger;
				$scope.customer = resp.data;
			},
			function(err){
			debugger;
			});
		});

      app.controller('logoutCtrl',function($scope,$http){
			$scope.load=function(){
				//alert("OK");
				$http.post("https://localhost:44358/api/logout").then(function(resp){
					window.location.href = "../../login.html"
				},function(err){
					$scope.msg = err.data.Msg;
				});
			};
			
		});