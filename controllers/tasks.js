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
        task.owner = req.token.userId;

        task.save()
            .then(addToProject)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error));


        function addToProject(task) {
            return Project.findById(req.params.id)
                .then(project => {
                    project.tasks.push(task);
                    task.project.push(project._id);
                    task.save();
                    return project.save();
                })
                .then(project => {return task;});
        }
        /*****************************  Problème ***************************
         function findByCreator(req) {
            Project.find()
                .then(projects => {
                    return projects.creator.toString() === req.token.userId ? project._id : Promise.reject({code: 403, reason: 'not.allowed'});
                });
        }*/
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
            .then(task => {
                addToUser(task);
            });
        function addToUser() {
            return User.findById(req.body.idUser)
                .then(user => {
                    user.tasks.push(task);
                    return user.save();
                })
                .then(user => {
                    return task;
                });
        }

    }
};