const http = require('http');
const url = require('url');
const router = require('./router');

const HOST = '0.0.0.0';
const PORT = 8081;

const onEnd = function onEnd(pathname, response, postData) {
  router.route(pathname, response, postData);
}

const onRequest = function onRequest(request, response) {
  const pathname = url.parse(request.url).pathname;
  console.log('Request received for ' + pathname);
  var postData = '';
  request.setEncoding('utf8');
  request.addListener('data', function (chunk) {
    postData += chunk;
  });
  request.addListener('end', function () {
    onEnd(pathname, response, postData); 
  });
}

const startServing = function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + HOST + ':' + PORT);
}

module.exports.startServing = startServing;
