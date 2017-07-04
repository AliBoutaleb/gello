const bodyParser = require('body-parser');

module.exports = (server) => {
    const Person = server.models.Person;

    return {
        list,
        create,
        remove,
        update
    };

    function list(req, res) {
        Person.find()
            .then(persons => {
                res.send(persons);
            });
    }

    function create(req, res) {
        Person.create(req.body)
            .then(person => {
                res.status(201).send(person);
            });
    }

    function remove(req, res) {
        Person.findByIdAndRemove(req.params.id)
            .then(()=> {
                res.status(204).send();
            })
    }

    function update(req, res) {
        Person.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.status(204).send();
            })
    }
};



