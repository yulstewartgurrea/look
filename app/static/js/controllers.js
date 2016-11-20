// angular.module('myApp').controller('userController',
//   ['$scope', '$location', '$window', '$AuthService',
//     function ($scope, $location, $window, $AuthService) {
//       $scope.isAuthenticated = false;
      
//       $scope.new_admin = function() {
//         $scope.error = false;
//         $scope.disabled = true;

//         AuthService.register(
//           $scope.new_adminForm.email_address,
//           $scope.new_adminForm.password)

//           //handle success
//           .then(function(){
//             $location.path('/');
//             $scope.disabled = false;
//             $scope.new_adminForm = {}
//           })
//           //handle error
//           .catch(function(){
//             $scope.error = true;
//             $scope.errorMessage = "Something went wrong!";
//             $scope.disabled = false;
//             $scope.new_adminForm = {};
//           });
//       };


//     };


//   ]);

angular.module('myApp').controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});