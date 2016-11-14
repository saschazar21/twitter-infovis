var http = require('http');
var socket = require('socket.io');
var twitter = require('../twitter/index');


module.exports = (app) => {
  var server = http.Server(app);
  var io = socket(server);

  io.on('connection', (socket) => {
    console.log('User connected.');
    socket.on('filter', msg => twitter(msg)
      .then((stream) => {
        stream.on('tweet', tweet => socket.emit('tweet', tweet));
        stream.on('disconnect', msg => console.log(`Disconnected: ${msg}`));
      })
      .catch(e => socket.emit('error', e)));
  });

  return server;
};
