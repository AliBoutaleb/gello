/**
 * Created by yidon on 06/07/2017.
 */
module.exports = (server) => {
    const Project = server.models.Project;
    const User = server.models.User;
    const Team = server.models.Team;

    return {
        list,
        create,
        remove,
        update
        //createTeam
    };

    function list(req, res) {
        Project.find()
            .then(projects => res.send(projects))
    }

    function create(req, res) {
        const userId = req.token.userId;

        let project = new Project(req.body);

        project.creator = userId;

        createATeam(project);
        return project.save()
            .then(project => res.status(201).send(project))
            .catch(err => res.status(500).send(err));

        function createATeam(project) {
            let team = new Team();
            team.project = project._id;
            project.equipe = team._id;
            return team.save();
        }
    }

    function remove(req, res) {
        findProject(req)
            .then(ensureExist)
            //.then(ensureCreator)
            .then(remove)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function remove() {
            return Project.findByIdAndRemove(req.params.id);
        }
    }

    function update(req, res) {
        findProject(req)
            .then(ensureExist)
            .then(ensureCreator)
            .then(update)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function update() {
            return Project.findByIdAndUpdate(req.params.id, req.body)
        }
    }



    // Globals
    function findProject(req) {
        return Project.findById(req.params.id)
    }
    function ensureCreator(project) {
        return project.creator.toString() === req.token.userId ? project : Promise.reject({code: 403, reason: 'not.allowed'});
    }

    function ensureExist(data) {
        return data ? data : Promise.reject({code: 422, reason: 'unprocessable.entities'});
    }
};