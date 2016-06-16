(function(angular, undefined) {
'use strict';

angular.module('pizzaSwapApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],apiEndPoint:'http://strato-dev4.blockapps.net/eth/v1.2/',keyserver:'http://localhost:8000/'})

;
})(angular);