module.exports = (server) => {
    const Team = server.models.Team;

    return {
        list,
        update,
        addMember,
        removeMember,
        //assignRole
    };

    function list(req, res) {
        Team.find()
            .then(teams => res.send(teams));
    }

    function update(req, res) {
        Team.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                res.status(204).send();
            })
            .catch(err => res.status(500).send(err))
    }

    function addMember(req, res) {
        let Team;

        findTeam(req)
            .then(ensureExist)
            .then(instance => team = instance)
            .then(findUser)
            .then(ensureExist)
            .then(ensureNotAlreadyMember)
            .then(addMember)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureNotAlreadyMember(user) {
            return team.members.some(member => member === user._id.toString()) ? Promise.reject({code: 403, reason: 'user.already.member'}) : user;
        }

        function addMember(user) {
            team.members.push(user);
            return team.save();
        }
    }

    function removeMember(req, res) {
        findTeam(req)
            .then(ensureExist)
            .then(instance => team = instance)
            .then(findUser)
            .then(ensureExist)
            .then(ensureIsMember)
            .then(removeMember)
            .then(() => res.status(204).send())
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findById(req.params.userId)
        }

        function ensureIsMember(user) {
            return team.members.some(member => member.toString() === user._id.toString()) ? user : Promise.reject({code: 403, reason: 'user.not.member'});
        }

        function removeMember(user) {
            team.members.remove(user);
            return team.save();
        }
    }
};