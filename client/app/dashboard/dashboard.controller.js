'use strict';

(function() {

class DashboardController {

  constructor($http, $scope, $stateParams, appConfig, cfpLoadingBar, localStorageService) {
    this.$http = $http;
    this.awesomeThings = [];
    $scope.pizzas = [];

    // regex to get if it is hexadecimal
    var re = /[0-9A-Fa-f]{6}/g;

    /**
     * We are saving user data in local storage.
     * You can very easily swap out local storage for a real database.
     */
    $scope.name = localStorageService.get('user');

    var getAccountData = function(address) {
      localStorageService.set('address', address);
      $http.get(appConfig.apiEndPoint + 'account?address=' + address).then(response =>{
        $scope.balance = (response.data[0].balance / 1000000000000000000).toFixed(3);
      });
    };

    $http.get(appConfig.keyserver + 'users/' + $stateParams.name).then(response =>{
      $scope.user = response.data[0];
      getAccountData($scope.user);
    });



    $http.get(appConfig.keyserver + 'contracts/Pizza').then(response => {
      response.data.forEach(contract => {
        if(re.test(contract)){
          $http.get(appConfig.keyserver + 'contracts/Pizza/' + contract + '/state/').then(response => {
            console.log("DO WE HAVE PIZZZAS");
            console.log(response);
            response.data.address = contract;
            response.data.id = contract.substr(0, 4);
            $scope.pizzas.push(response.data);
          });
        }
      });
    });

  }

}

angular.module('pizzaSwapApp')
  .controller('DashboardController', DashboardController);

})();
