const bodyParser = require('body-parser');

module.exports = (server) => {
    const Person = server.models.Person;

    server.get('/persons', listPersons);
    server.post('/persons', bodyParser.json(), createPerson);
    server.delete('/persons/:id', removePerson);
    server.put('/persons/:id', updatePerson);

    function listPersons(req, res) {
        Person.find()
            .then(persons => {
                res.send(persons);
            });
    }

    function createPerson(req, res) {
        Person.create(req.body)
            .then(person => {
                res.status(201).send(person);
            });
    }

    function removePerson(req, res) {
        Person.findByIdAndRemove(req.params.id)
            .then(()=> {
                res.status(204).send();
            })
    }

    function updatePerson(req, res) {
        Person.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.status(204).send();
            })
    }
};



