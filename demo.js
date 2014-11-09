var demoApp = angular.module('demoApp', ['restangular', 'firebase']);

demoApp.controller('LodashController', function ($scope) {
    var start = '1,2,4,gGD,5,sdasd';
    $scope.result = _.chain(start.split(','))
        .filter(function (item) { return !isNaN(item); })
        .map(function (item) { return item * 2; })
        .reduce(function (acc, item) { return acc + item; })
        .value();
});

demoApp.controller('ToastrController', function ($scope) {
	$scope.run = function () {
		toastr.info('This is some information');
		toastr.success('Great Success!');
		toastr.warning('Warning! Go Back!');
		toastr.error('Gah! There has been an error');
	};
});

demoApp.controller('RestangularController', function ($scope, Restangular) {
	Restangular.setBaseUrl('https://api.github.com/');
	Restangular.one('users', 'braidenjudd').get().then(function (account) {
		$scope.email = account.email;
		$scope.full_name = account.name;
	});
});

demoApp.controller('ChartJsController', function ($scope) {
	var ctx = document.getElementById("myChart").getContext("2d");

	var data = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
	};

	var myLineChart = new Chart(ctx).Line(data);
});

demoApp.controller('Auth0Controller', function ($scope) {
	var auth0 = new Auth0({
		domain:       'pragmaticyclist.auth0.com',
		clientID:     'eBR1Gt2LSsqdwOkhXtBdhdOtwbVD2njH',
		callbackURL:  '',
		callbackOnLocationHash: true
	});

	$scope.signin = function() {
		auth0.login({ popup: true }, function(err, profile) {
			$scope.user = profile;	
			$scope.$digest();
		});
	};
});

demoApp.controller('MomentJsController', function ($scope, $interval) {
	$interval(function () {
		$scope.time1 = moment().format('MMMM Do YYYY, h:mm:ss a');
		$scope.time2 = moment().format('dddd');
		$scope.time3 = moment().format("MMM Do YY");
		$scope.time4 = moment().format('YYYY [escaped] YYYY');
		$scope.time5 = moment().format();
	}, 1000);
});

demoApp.controller('FirebaseController', function ($scope, $firebase) {
	var ref = new Firebase("https://braiden.firebaseio.com/votes/test");
	var sync = $firebase(ref);
	var syncObject = sync.$asObject();
	syncObject.$bindTo($scope, "firebase_data");
});