var demoApp = angular.module('demoApp', ['restangular', 'firebase']);

demoApp.controller('LodashController', function ($scope, $q, Restangular) {
    var start = '1,2,4,gGD,5,sdasd';
    $scope.result = _.chain(start.split(','))
        .filter(function (item) { return !isNaN(item); })
        .map(function (item) { return item * 2; })
        .reduce(function (acc, item) { return acc + item; })
        .value();

    getGithubStatsfunction(Restangular, $q, 'lodash', 'lodash').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('ToastrController', function ($scope, $q, Restangular) {
	$scope.run = function () {
		toastr.info('This is some information');
		toastr.success('Great Success!');
		toastr.warning('Warning! Go Back!');
		toastr.error('Gah! There has been an error');
	};

	getGithubStatsfunction(Restangular, $q, 'CodeSeven', 'toastr').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('RestangularController', function ($scope, $q, Restangular) {
	Restangular.setBaseUrl('https://api.github.com/');
	Restangular.one('users', 'braidenjudd').get().then(function (account) {
		$scope.email = account.email;
		$scope.full_name = account.name;
	});

	getGithubStatsfunction(Restangular, $q, 'mgonto', 'restangular').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('ChartJsController', function ($scope, $q, Restangular) {
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

	getGithubStatsfunction(Restangular, $q, 'nnnick', 'Chart.js').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('UIRouterController', function ($scope, $q, Restangular) {
	getGithubStatsfunction(Restangular, $q, 'angular-ui', 'ui-router').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('Auth0Controller', function ($scope, $q, Restangular) {
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

	getGithubStatsfunction(Restangular, $q, 'auth0', 'auth0-angular').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('MomentJsController', function ($scope, $interval, $q, Restangular) {
	$interval(function () {
		$scope.time1 = moment().format('MMMM Do YYYY, h:mm:ss a');
		$scope.time2 = moment().format('dddd');
		$scope.time3 = moment().format("MMM Do YY");
		$scope.time4 = moment().format('YYYY [escaped] YYYY');
		$scope.time5 = moment().fromNow();
	}, 1000);

	getGithubStatsfunction(Restangular, $q, 'moment', 'moment').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('FirebaseController', function ($scope, $firebase, $q, Restangular) {
	var ref = new Firebase("https://braiden.firebaseio.com/votes/fruit");
	var sync = $firebase(ref);
	var syncObject = sync.$asObject();
	syncObject.$bindTo($scope, "fruit");

	getGithubStatsfunction(Restangular, $q, 'firebase', 'angularfire').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('Firebase2Controller', function ($scope, $firebase) {
	var ref = new Firebase("https://braiden.firebaseio.com/votes/fruit");
	var sync = $firebase(ref);
	var syncObject = sync.$asObject();
	syncObject.$bindTo($scope, "fruit");
});

demoApp.controller('BootstrapController', function ($scope, $q, Restangular) {
	getGithubStatsfunction(Restangular, $q, 'twbs', 'bootstrap').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

demoApp.controller('IonicController', function ($scope, $q, Restangular) {
	getGithubStatsfunction(Restangular, $q, 'driftyco', 'ionic').then(function (github_data) {
		$scope.github_data = github_data;
	});
});

// directives
demoApp.directive('githubStats', function() {
	return {
		scope: {
			url: '=url',
        	stars: '=stars',
        	last: '=last',
        	data: '&data'
      	},
      	restrict: "E",
		templateUrl: 'github-stats.html'
	};
});

// helper functions
var getGithubStatsfunction = function (Restangular, $q, org, repo) {
	Restangular.setBaseUrl('https://api.github.com/');
	var deferred = $q.defer();

	//Restangular.setDefaultHeaders ({'Authorization': 'Basic braidenjudd'}); 
	Restangular.one('repos', org).one(repo).get().then(function (repo_details) {
		deferred.resolve({
			url: repo_details.html_url,
			stars: repo_details.stargazers_count,
			last: moment(repo_details.pushed_at).fromNow()
		});
	});

	return deferred.promise;
};