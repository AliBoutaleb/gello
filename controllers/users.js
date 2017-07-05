const bodyParser = require('body-parser');

module.exports = (server) => {
    const User = server.models.User;

    return {
        list,
        create,
        remove,
        update
    };

    function list(req, res) {
        User.find()
            .then(persons => {
                res.send(persons);
            });
    }

    function create(req, res) {
        User.create(req.body)
            .then(person => {
                res.status(201).send(person);
            })
            .catch(err => res.status(500).send(err));
    }

    function remove(req, res) {
        User.findByIdAndRemove(req.params.id)
            .then(()=> {
                res.status(204).send();
            })
    }

    function update(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.status(204).send();
            })
            .catch(err => res.status(500).send(err))
    }
};



