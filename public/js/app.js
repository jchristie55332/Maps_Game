(function(){
  function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };
  var app = angular.module('myApp', ['google-maps']);
  app.controller("MyController", ["$scope", "$http", function($scope, $http){
    var locations = gon.locations;
    var a = locations.length;
    var b = Math.floor((Math.random() * a) + 1);
    console.log(b)
    $scope.locations = shuffle(locations);
    $scope.location = locations[b];
    $scope.answer = false;
    $scope.notAnswer = false;
    $scope.searchPlace = function(loc){
      $scope.answer = $scope.location.name===loc.name;
      $scope.notAnswer = !$scope.answer
    };        
    $scope.map = {
      center: {
        latitude: $scope.location.lat,
        longitude: $scope.location.lng
      },
      zoom: 18,
      options: {
        streetViewControl: false,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
      }
    };

    $scope.setCenter = function () {
      $scope.answer = false;
      $scope.notAnswer = false;
      var a = locations.length;
      var b = Math.floor((Math.random() * a) + 1);
      $scope.locations = shuffle(locations);
      $scope.location = locations[b];
      $scope.map.center =  {
        latitude: $scope.location.lat,
        longitude: $scope.location.lng
      }
      
    }
  }]);

   app.directive('mapDisplay', function() {
      return {
        restrict: 'AEC',
        templateUrl: 'map-display.html'
      };
  });
})();