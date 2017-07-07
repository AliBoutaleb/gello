const bodyParser = require('body-parser');

module.exports = (server) => {
    const Task = server.models.Task;
    const User = server.models.User;
    const Project = server.models.Project;

    return {
        list,
        create,
        remove,
        update,
        assign
    };

    function list(req, res) {
        return Task.find()
            .then(tasks => res.send(tasks));
    }

    function create(req, res) {
        let task = new Task(req.body);
        findUser(req)
            .then(user => {
                task.owner = user._id;
                user.tasks.push(task);
                user.save()});

        addToProject(task);
        task.save()
            //.then(addToProject)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error));


        function addToProject(task) {
            return Project.findById(req.params.id)
                .then(project => {
                    project.tasks.push(task);
                    task.project = req.params.id;
                    task.save();
                    return project.save();
                })
                .then(project => {return task;});
        }
    }

    function remove(req, res) {
        return Task.findByIdAndRemove(req.params.id)
            .then(() => res.status(204).send())
    }

    function update(req, res) {
        return Task.findByIdAndUpdate(req.params.id, req.body)
            .then(task => res.status(204).send());
    }
    
    function assign(req, res) {
        return Task.findById(req.params.id)
            //.then(instance => task = instance)
            .then(task => {
                addToUser(task);
            });

        function addToUser(task) {
            return User.findById(req.body.idUser)
                .then(user => {
                    ensureNotAlreadyTaken(task, user);
                    user.tasks.push(task);
                    task.owner = user._id;
                    task.save();
                    res.send(task);
                    return user.save();
                })
                .then(user => task)
                .catch(err => res.status(err.code || 500).send(err.reason || err));
        }

    }

    function findUser(req) {
        return User.findById(req.token.userId);
    }

    function ensureExist(data) {
        return data ? data : Promise.reject({code: 422, reason: 'unprocessable.entities'});
    }

    function ensureNotAlreadyTaken(task, user) {
        return ("x"+task.owner === "x"+user._id) ? Promise.reject({code: 403, reason: 'task.already.taken'}) : task;
        //res.send("y"+task.owner);
        //res.send("x"+user._id);
        //return user;
        //return ("x" + task.owner === "x" + user._id) ? res.send("same") : res.send("diff");
    }
};
