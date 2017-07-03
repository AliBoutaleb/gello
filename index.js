const http = require('http');

const server = http.createServer((request, response) => {
   response.end('it works!');
});

console.log('server listening on port', 8080);
server.listen(8080);
