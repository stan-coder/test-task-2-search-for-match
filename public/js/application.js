var app = angular.module('test-task-2-search-for-match', []);

app.controller('generalCtrl', ($scope, $http, $timeout) => {

	$scope.mode = 1;
	$scope.match = {
		1: {
			input: 'input 1',
			patterns: ['one', 'two']
		}, 
		2: {
			input: 'input 22',
			patterns: ['three', 'four']
		}
	};

	$scope.getModeBtnClass = (mode) => {
		return mode == $scope.mode ? 'darkOrange' : '';
	};

	$scope.changeMode = (mode) => {
		$scope.mode = mode;
	};

	$scope.reveal = () => {

		$http
			.post('/getMath', {mode: $scope.mode})
			.then(
				(res) => {
					var data = res.data;
					if (Object.getPrototypeOf(data) === Object.prototype && data.success === true && data.hasOwnProperty('data')) {

						var data = data.data;
						if (data.length < 1) {
							// Show text that have not been found any patterns
							return;
						}

						for (let key in data) {
							console.log(data[key]);
						}
						return;
					}
					// Do error warning
					console.log('error');
				},
				(data) => {
					console.log(data);
				}
			);
	};
});