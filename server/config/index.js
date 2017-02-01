"use strict";

const config = process.argv.indexOf('dev') !== -1 ? './app.dev' : './app.prod';

module.exports = require(config);
