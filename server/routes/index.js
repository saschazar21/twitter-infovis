"use strict";

var router = require('express').Router();

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

router.get('/test', function(req, res) {
  return res.json({
    success: true
  });
});

module.exports = router;
