const express = require('express');
const server = express();
const bodyParser = require('body-parser');
console.log('server listening on port 8080');
/**
 * Liste les personnes en base de données
 */
server.get('/persons', (req, res, next) => {
    res.send('list');
});

/**
 * Créer une nouvelle personne
 */
server.post('/persons',
    bodyParser.json(),
    (req, res, next) => {
        res.send(req.body);
    });

/**
 * Supprime les personne avec le nom passé dans la route
 */
server.delete('/persons/:name', (req, res, next) => {
    const name = req.params.name;
    res.send('delete');
});

/**
 * Met à jour les personnes qui ont pour nom <:old> avec <:new>
 */
server.put('/persons/:old/:new', (req, res, next) => {
    res.send('update');
});

server.listen(8080);