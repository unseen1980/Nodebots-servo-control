// server.js
var express = require('express');
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io = require('socket.io')(httpServer);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);
var servo;
var deg = 0;

//Arduino board connection

var board = new five.Board();
board.on("ready", function() {
  console.log('Arduino connected');
  servo = new five.Servo(10);
});

//Socket connection handler
io.on('connection', function(socket) {
  console.log(socket.id);

  // socket.on('test', function() {
  //   console.log('This is a test');
  // });

  socket.on('servo:min', function() {
    servo.min();
    console.log('Set servo to min');
  });

  socket.on('servo:max', function() {
    servo.max();
    console.log('Set servo to min');
  });

  socket.on('servo:sub', function() {
    if(deg == 0){
        return
    }
    else{
        deg = deg - 5
        servo.to(deg);
    }
    
    console.log('Set servo to ' + deg);
  });

  socket.on('servo:add', function() {
    if(deg == 180){
        return
    }
    else{
        deg = deg + 5
        servo.to(deg);
    }
    console.log('Set servo to min');
  });

  socket.on('servo:angle', function(data) {

    servo.to(parseFloat(data).toFixed(0));

    console.log('Set servo to angle ' + parseFloat(data).toFixed(0));
  });

});

console.log('Waiting for connection');
