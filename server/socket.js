"use strict";

const http = require('http');
const socket = require('socket.io');
const twitter = require('./twitter');


module.exports = (app) => {
  let server = http.Server(app);
  let io = socket(server);

  io.on('connection', (socket) => {
    console.log('connection');
    socket.on('filter', msg => twitter(msg)
      .then((stream) => {
        socket.on('disconnect', () => stream.close());
        stream.on('tweet', tweet => socket.emit('tweet', tweet));
        stream.on('disconnect', msg => socket.emit('stream_error'));
        stream.on('error', msg => socket.emit('stream_error'));
        stream.on('reconnect', msg => socket.emit('stream_recovered'));
      })
      .catch(e => socket.emit('error', e)));
  });

  return server;
};
