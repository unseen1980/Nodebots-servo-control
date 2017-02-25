var app = angular.module('myApp', ['btford.socket-io', 'uiSlider']).
factory('mySocket', function(socketFactory) {
  return socketFactory();
}).
controller('arduinoCtrl', function($scope, mySocket) {
  $scope.angle = 0;
  $scope.$watch('angle', function(newVal, oldVal) {
    console.log(parseFloat(newVal).toFixed(0));
    mySocket.emit('servo:angle', parseFloat(newVal).toFixed(0));
  });

  $scope.servoMin = function() {
    mySocket.emit('servo:min');
    console.log('Servo set at min');
  };


  $scope.servoMax = function() {
    mySocket.emit('servo:max');
    console.log('Servo set at max');
  };

  $scope.servoSub = function() {
    mySocket.emit('servo:sub');
    console.log('Servo sub');
  };


  $scope.servoAdd = function() {
    mySocket.emit('servo:add');
    console.log('Servo add');
  };
  
});
