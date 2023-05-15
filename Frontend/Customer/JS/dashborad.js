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
		localStorage.setItem("name", resp.data.Name);
		localStorage.setItem("email", resp.data.Email);
		localStorage.setItem("gender", resp.data.Gender);
		localStorage.setItem("dob", resp.data.Dob);
		localStorage.setItem("phone", resp.data.Phone);
		localStorage.setItem("location", resp.data.Location);
		localStorage.setItem("password", resp.data.Password);

	},
	function(err){
		debugger;
	});
});

app.controller('logoutCtrl',function($scope,$http){
	$scope.load=function(){
		$http.post("https://localhost:44358/api/logout").then(function(resp){
			window.location.href = "../../login.html"
		},function(err){
			$scope.msg = err.data.Msg;
		});
	};	
});

app.controller('UpdateCtrl', function($scope,$http){
	$scope.customeruser=localStorage.getItem("user");
	$scope.customername=localStorage.getItem("name");
	$scope.customeremail=localStorage.getItem("email");
	$scope.customergender=localStorage.getItem("gender");
	$scope.customerdob=localStorage.getItem("dob");
	$scope.customerphone=localStorage.getItem("phone");
	$scope.customerlocation=localStorage.getItem("location");
	$scope.customerpassword=localStorage.getItem("password");
	$scope.Update=function(){
		$scope.s.Username=localStorage.getItem("user");
		$scope.s.Password=localStorage.getItem("password");
		var v = $scope.s;
		$http.post("https://localhost:44358/api/customers/"+localStorage.getItem("user")+"/update",v).then(function(resp){
			alert("Update Done!");
			window.location.href = "profile.html";
		},
		function(err){
			alert("Update Failed!");
		});
	};
});

app.controller('ProductCtrl',function($scope,$http){
	$http.get("https://localhost:44358/api/admins/product").then(function(resp){
		debugger;
		$scope.product = resp.data;
	},
	function(err){
		debugger;
	});
});