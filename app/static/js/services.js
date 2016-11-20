var hostname = document.location.host;

angular.module('myApp').factory('AuthService',
	['$q', '$timeout', '$http', '$window',
		function ($q, $timeout, $http, $window) {

			function new_admin(email, password) {

				//create a new instance of deferred
				var deferred = $q.defer();

				//send a post request to the server
				$http.post('http://localhost:5000/new_admin', {email_address: email_address, password: password})
				//handle success
				.success(function(data, status) {
					if (status==200 && data.result){
						user = true;
						deferred.resolve();
					}else {
						user = false;
						deferred.reject();
					}

				})
				// handle error
				.error(function(data){
					user = false;
					deferred.reject();
				});

				return deferred.promise;
			}

			return({
				new_admin: new_admin
			});

		}

	]);