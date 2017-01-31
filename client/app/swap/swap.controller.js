'use strict';

(function() {

class SwapController {

  constructor($http, $scope, $stateParams, appConfig, cfpLoadingBar, $location, localStorageService, $state) {

    $scope.pizzaContract= {
      price: '',
      topping: ''
      //,
      //oracleAddress: ''
    };

    /**
     * Get the address of the oracle
     */
    $scope.getOracleAddress = function() {
      $http.get(appConfig.keyserver + 'users/oracle').then(response => {
        console.log("THIS IS THE ORACLE");
        console.log(response.data);
        $scope.pizzaContract.oracleAddress = response.data[0];
      });
    }
    //$scope.getOracleAddress();

    $scope.user = localStorageService.get('user');

    $scope.submit = function(){
      $('#mining-transaction').modal('show');
      /**
       * In this sample app we will fetch the contract src from the page using jQuery.
       * You could get the contract source from where ever you like.
       */
      var details = {
        password: "thepass",
        src: "contract Pizza {  address seller;  address buyer;  address oracle;  address satisfactionOracle;  uint pizzaPrice;  uint guarantee;  uint eth = 1000000000000000000;  string pizzaToppings;  string stateMessage;  string message;  uint stateInt;  function Pizza() {    seller = msg.sender;    stateMessage = \"Uploaded pizza smart contract\";    stateInt = 1;    message = stateMessage;  }  function setUpPizzaDetails(uint price, string topping) {    stateMessage = \"Pizza details set\";    message = stateMessage;    stateInt = 2;    pizzaPrice = price;    pizzaToppings = topping;  }  function buyerAcceptsPizzaContract() {    if (msg.value >=  eth * pizzaPrice) {      buyer = msg.sender;      stateInt = 3;      stateMessage = \"Buyer funded pizza contract\";      message = stateMessage;    } else {      msg.sender.send(msg.value);      message = \"Contract not funded. Refunded money\";    }  }  function pizzaAccepted() {    if (msg.sender == buyer) {      stateInt = 4;      stateMessage = \"Pizza Delivered\";      message = stateMessage;      seller.send(this.balance);    } else {      message = \"Only buyer can accept\";    }  }  function rateSatisfaction(bool isHappy) {    stateInt = 5;    if (isHappy) {      stateMessage = \"The buyer was happy.\";      seller.send(this.balance);    } else {      stateMessage = \"The buyer requested refund.\";      buyer.send(this.balance);    }  }}",
        txParams:{
          gasLimit : 100000000,
          gasPrice : 1
        }
      };

      var req = {
        method: 'POST',
        url: appConfig.keyserver + 'users/' + localStorageService.get('user') + '/' + localStorageService.get('address') + '/contract',
        headers: {
          "content-type": "application/json"
        },
        data : JSON.stringify(details)
      };
      $http(req).then(response => {

        $scope.newContract = response.data;
        /**
         * After deploying the smart contract we will call
         * the contract method and pass in the contract details
         */

        var data = {
          "password": "thepass",
          "method": "setUpPizzaDetails",
          "args": {
            "price": parseInt($scope.pizzaContract.price),
            "topping": $scope.pizzaContract.topping
            //,
            //"oracleAddress": $scope.pizzaContract.oracleAddress
          },
          "value": 0,
          "txParams":{
            "gasLimit" : 100000000,
            "gasPrice" : 1
          }
        };

        var req = {
         method: 'POST',
         url: appConfig.keyserver + 'users/' + localStorageService.get('user')+ '/'+ localStorageService.get('address') + '/contract/Pizza/' + $scope.newContract + '/call',
         headers: {
           'Content-Type': 'application/json'
         },
         data: data
        };

        $http(req).then(response => {
          /**
           * Now that we have a successfully deployed smart contract
           * let's transition to the detail view of the contract.
           */
          $('#mining-transaction').modal('hide');
          $('#mining-transaction').on('hidden.bs.modal', function (e) {
            $state.transitionTo('issuance', {id:$scope.newContract});
          });
        }, response => {
            $scope.data = response.data || "Request failed";
            $scope.status = response.status;
        });
      }, response => {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });

    }

  }

}

angular.module('pizzaSwapApp')
  .controller('SwapController', SwapController);

})();
