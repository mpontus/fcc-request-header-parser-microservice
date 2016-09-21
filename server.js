var http = require('http');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.json({
    ip_address: retrieveIpAddress(req),
    language: retrieveLanguage(req),
    operating_system: retrieveOperatingSystem(req),
  });
});

app.use(function(req, res, next) {
  res.redirect('/');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function () {
  var bind = server.address();
  console.log("Listening on " + bind.address + ':' + bind.port);
});

var retrieveIpAddress = function (req) {
  return req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
}

var retrieveLanguage = function (req) {
  var acceptLanguage = req.headers['accept-language'];
  if (!acceptLanguage) return null;
  return acceptLanguage.split(',')[0];
}

var retrieveOperatingSystem = function (req) {
  var userAgent = req.headers['user-agent'];
  if (!userAgent) return null;
  var matches = userAgent.match(/\((.*)\)/);
  if (!matches) return null;
  return matches[1] || null;
}
