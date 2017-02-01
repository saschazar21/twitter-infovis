"use strict";

const fs = require('fs');
const config = require('../config');

module.exports = (req, res, next) => {
    fs.stat(config.publicDir + req.url, (err, stats) => {
        req.isFile = stats && stats.isFile();
        next();
    });
}
