"use strict";

var router = require('express').Router();
var twitter = require('../twitter/index');

// define middleware and routes here

function isObject(item) {
  return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

function createErrRes(err) {
  let error = isObject(err) ? err : { message: err };
  let statusCode = err && err.statusCode ? err.statusCode : 500;

  error.name = error.name || 'HueapiError';
  error.message = error.message || 'Whoops, something went wrong. That\'s all we know :(';
  error.statusCode = error.statusCode || statusCode;

  return error;
}

router.get('/twitter', (req, res) => {
  return twitter(req.query)
  .then(stream => {
    stream.on('data', tweet => res.json(tweet));
  })
  .catch(e => res.status(500).json(e));
});

router.get('/test', function(req, res) {
  return res.json({
    success: true
  });
});

module.exports = router;
