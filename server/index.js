require('./bootstrap');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var compress = require('compression');
var appConfig = require('./config/app');
var appDevConfig = require('./config/app.dev');
var socket = require('./socket/index');

var app = express();
var http = socket(app);

// Define font mime types
express.static.mime.define({
  'application/x-font-woff': ['woff'],
  'application/x-font-woff2': ['woff2'],
  'application/x-font-ttf': ['ttf']
});

// Set app config depending on argument passed to start script
var config;
if (process.argv.indexOf('dev') !== -1) {
  config = appDevConfig;
} else {
  config = appConfig;
}

console.log('');
console.log('Server environment is ' + process.env.NODE_ENV);
console.log('Server public dir set to ' + config.publicDir);

// Compress responses
app.use(compress());

// Request middleware
// app.use(require('./middleware/httpsRedirect'));
app.use(require('./middleware/isFile'));
app.use(express.static(path.join(__dirname, config.publicDir)));

// Routes
app.use(require('./routes/index'));

// Serve index if file does not exist
app.get('*', function(req, res, next) {
  if (!req.isFile) {
    return res.sendFile('index.html', {
      root: path.join(__dirname, config.publicDir)
    });
  }

  return next();
});

// Response middleware
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(errorHandler({
  dumpExceptions: !config.production,
  showStack: !config.production
}));

// Use port 5000 in development
var port = config.production ? process.env.PORT : 5000;
port = !port ? 5000 : port;

// Start the server
http.listen(port);

console.log('Server listening on port ' + port);
console.log('');
