"use strict";

const http = require('http');
const socket = require('socket.io');
const twitter = require('./twitter');


module.exports = (app) => {
  let server = http.Server(app);
  let io = socket(server);

  io.on('connection', (socket) => {
    console.log(`Socket connection established.`)
    socket.on('filter', msg => twitter(msg)
      .then((stream) => {
        stream.on('tweet', tweet => socket.emit('tweet', tweet));
        stream.on('disconnect', msg => console.log(`Disconnected: ${msg}`));
      })
      .catch(e => socket.emit('error', e)));
  });

  return server;
};
