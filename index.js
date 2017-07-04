const express = require('express');
const server = express();

require('./models')(server);
require('./actions')(server);

server.listen(8080);
