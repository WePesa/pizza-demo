## Intro

###This app is intended to get you started using the bloc API, which is powered by a STRATO API. It demonstrates 3 main feature of the bloc api.

  * Key creation and management
  * Smart contract creation
  * Smart contract invocation

####Application Structure
This app wires an angular front-end to our node tool bloc for working with smart contracts. Some knowledge of angular is helpful for understanding the app but not required.


## Part I: Key Management

Every interaction with the blockchain requires use of a public/private key pair and associated account on the blockchain. To do this you will need an instance of bloc running to make requests to.

If you use Vagrant bloc will be included in the machine. If you are running this manually you will need to set bloc up yourself. 

Once the environment is setup you will need to create a bloc project by running 

`bloc init` 

Then you will need 3 users. For this example use `thepass` as the password for each user and run the following commands

`bloc genkey pizzaMaker`
`bloc genkey buyer`
`bloc genkey oracle`


Note: In the bloc project directory you will see `app/users/` with associated username directories. These directories contain the keys associated with those users. 

Finally run `bloc start` in your bloc project directory and your bloc API will be up and ready to handle requests from the angular app.

Now in your pizza app root directory run `grunt serve` and you should see the app running on localhost:9000.

Login with the pizzaMaker user and we can then deploy a new smart contract.


## Part II: Smart Contract Creation

Here you can see the create contract button. Click create contract, then choose 1 topping and enter an integer price (ex: 6), and press deploy contract. You should now see a pizza contract in the contract dashboard.

Below is a code snippet showing how the contract was actually deployed

```
var details = {
  password: "thepass",
  src:  $('#contract_source').text()
};

var req = {
  method: 'POST',
  url: appConfig.keyserver + 'users/' + localStorageService.get('user') + '/' + localStorageService.get('address') + '/contract',
  headers: {
    "content-type": "application/json"
  },
  data : JSON.stringify(details)
};
$http(req).then(response => {...
```

In this sample we are storing the contract src in the index file. For obvious reasons this is not secure but is more than fine for demonstration. 

```
var details = {
  password: "thepass",
  src:  $('#contract_source').text()
};
```

Once we have the contract we can POST the source to our bloc api that is running. Here you can see we are using local storage to save the username and public address for the user who is uploading the contract.

```var req = {
  method: 'POST',
  url: appConfig.keyserver + 'users/' + localStorageService.get('user') + '/' + localStorageService.get('address') + '/contract',
  headers: {
    "content-type": "application/json"
  },
  data : JSON.stringify(details)
};
$http(req).then(response => {...
```

Once this returns successfully we have created a new smart contract with our pizzaMaker user.

###Part III: Smart Contract Invocation

After our upload has finished successfully we then populate the newly created contract with our topping and pricing details

```
var data = {
  "password": "thepass",
  "method": "setUpPizzaDetails",
  "args": {
    "price": $scope.pizzaContract.price,
    "topping": $scope.pizzaContract.topping
    //,
    //"oracleAddress": $scope.pizzaContract.oracleAddress
  },
  "contract": "Pizza"
};

var req = {
 method: 'POST',
 url: appConfig.keyserver + 'users/' + localStorageService.get('user')+ '/'+ localStorageService.get('address') + '/contract/Pizza/' + $scope.newContract + '/call',
 headers: {
   'Content-Type': 'application/json'
 },
 data: JSON.stringify(data)
};

$http(req).then(response => {...
```

Here we are hitting the contract method route, you can see above that we pass in the method name as a POST parameter `"method": "setUpPizzaDetails"`

Now if you logout, and then login as the buyer we can fund this contract which will hold the money until the buyer's satisfaction is indicated.








