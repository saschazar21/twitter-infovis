"use strict";

console.log('Starting server...');

const path = require('path');
const fs = require('fs');
const env = require('node-env-file');
const production = process.argv.indexOf('dev') !== -1 ? false : true;

var envFile = path.join(__dirname, '/.env');
var fileExists = false;

try {
  fs.accessSync(envFile, fs.F_OK)
  fileExists = true;
} catch (e) {
  try {
    if (production) {
      return;
    }

    fs.writeFileSync(envFile, fs.readFileSync(envFile + '.example'));
    fileExists = true;
  } catch (e) {
    console.log('.env file could not be created.')
  }
}

if (fileExists) {
  env(__dirname + '/.env');
}
