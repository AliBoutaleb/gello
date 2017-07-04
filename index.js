const express = require('express');
const server = express();

console.log('server listening on port 8080');

server.get('/persons', (req, res, next) => {
    res.send('list');
});

server.post('/persons', (req, res, next) => {
    res.send('create');
});

server.delete('/persons/:name', (req, res, next) => {
    const name = req.params.name;
    res.send('delete');
});

server.put('/persons/:old/:new', (req, res, next) => {
    res.send('update');
});

server.listen(8080);