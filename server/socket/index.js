var http = require('http');
var socket = require('socket.io');


module.exports = (app) => {
  var server = http.Server(app);
  var io = socket(server);

  io.on('connection', (socket) => {
    console.log('User connected to socket.');
    socket.on('welcome', (msg) => console.log(`User sent: ${msg}`));
  });

  return server;
};
