const sha1 = require('sha1');

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
            .then(users => res.send(users));
    }

    function create(req, res) {
        req.body.password = sha1(req.body.password);

        return findUser()
            .then(ensureNone)
            .then(createUser)
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findOne({email: req.body.email})
        }

        function ensureNone(user) {
            return user ? Promise.reject({code: 403, reason: 'user.exists'}) : null;
        }

        function createUser() {
            User.create(req.body)
                .then(user => res.status(201).send(user));
        }
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



