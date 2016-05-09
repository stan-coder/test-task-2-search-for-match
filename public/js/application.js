var app = angular.module('test-task-2-search-for-match', []);

app.controller('generalCtrl', ($scope, $http, $timeout) => {

	$scope.mode = 1;
	$scope.match = [];
	$scope.resultTableHidden = true;
	$scope.errorPanelHidden = true;
	$scope.errorMessage = '';
	$scope.timeout = null;

	$scope.getModeBtnClass = (mode) => {
		return mode == $scope.mode ? 'darkOrange' : '';
	};

	$scope.changeMode = (mode) => {
		$scope.mode = mode;
	};

	$scope.reveal = () => {
		$scope.resultTableHidden = true;

		$http
			.post('/getMatch', {mode: $scope.mode})
			.then(
				(res) => {
					var data = res.data;
					if (Object.getPrototypeOf(data) === Object.prototype && data.success === true && data.hasOwnProperty('data')) {

						data = data.data;
						if (data.length < 1) {
							// Show text that have not been found by any patterns
							return showErrorPanel('There are no any patterns matched with input');
						}
						return ($scope.match = data, $scope.resultTableHidden = false);
					}
					// Do error warning
					showErrorPanel(null, true);
				},
				(data) => {
					showErrorPanel(null, true);
				}
			);
	};

	$scope.hideErrorPanel = () => {
		$timeout.cancel($scope.timeout);
		$scope.errorPanelHidden = true;
	};

	function showErrorPanel(message, onServer) {
		$scope.errorMessage = !onServer ? message : 'Some error has occurred on server side.';
		$scope.errorPanelHidden = false;
		$scope.timeout = $timeout(() => {
			$scope.errorPanelHidden = true;
		}, 1400);
	}
});