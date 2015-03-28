var URL = 'http://google.com/';

angular.module('Appaboo', ['ionic'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})

	.controller('AliasSubmissionController', ['$scope', '$http', '$ionicPopup', function ($scope, $http, $ionicPopup) {
		this.alias = null; // the controller starts with no alias to send

		/**
		 * Submit Alias
		 *
		 * Sends the alias to the hard-coded UR
		 */
		this.submitAlias = function () {
			var alias = this.alias;

			if (alias) {
				$http.get(URL + '?alias=' + alias).
					success(function (data, status, headers, config) {
						$ionicPopup.alert({
								title: 'Success!', // String. The title of the popup.
								cssClass: 'alias-submit-success', // String, The custom CSS class name
								subTitle: 'Submitted Alias: ' + alias, // String (optional). The sub-title of the popup.
								//template: '', // String (optional). The html template to place in the popup body.
								//templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
								okText: 'OK', // String (default: 'OK'). The text of the OK button.
								okType: 'button-positive' // String (default: 'button-positive'). The type of the OK button.
							}).then(function() {
								navigator.app.exitApp();
							});
					}).
					error(function (data, status, headers, config) {
						$ionicPopup.alert({
							title: 'Fail!', // String. The title of the popup.
							cssClass: 'alias-submit-error', // String, The custom CSS class name
							//subTitle: '', // String (optional). The sub-title of the popup.
							//template: '', // String (optional). The html template to place in the popup body.
							//templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
							okText: 'OK', // String (default: 'OK'). The text of the OK button.
							okType: 'button-negative' // String (default: 'button-positive'). The type of the OK button.
						}).then(function() {
							navigator.app.exitApp();
						});
					});
			} else {
				console.log('No alias');
			}
		};
	}]);
