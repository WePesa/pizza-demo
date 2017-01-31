(function(angular, undefined) {
'use strict';

angular.module('pizzaSwapApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],apiEndPoint:'http://tester7.centralus.cloudapp.azure.com/strato-api/eth/v1.2/',keyserver:'http://localhost:8000/'})

;
})(angular);