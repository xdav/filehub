/**
* FileHub
*
* Copyright (c) 2016 David Youster
*
* Made available under the terms of the MIT license. See LICENSE.txt for more
* information.
*/

const http = require('http');
const url = require('url');
const os = require('os');
const router = require('./router');

const HOST = '0.0.0.0';
const PORT = 8081;

function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + getNetworkIP() + ':' + PORT);
}

function onRequest(request, response) {
  const pathname = url.parse(request.url).pathname;
  const query = url.parse(request.url, true).query;
  console.log(request.connection.remoteAddress + ' requested ' + pathname);
  router.route(pathname, query, response, request);
}

function getNetworkIP() {
  return os.networkInterfaces().wlan0[0].address;
}

module.exports.startServing = startServing;
