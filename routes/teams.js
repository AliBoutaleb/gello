const router = require('express').Router();
const bodyParser = require('body-parser');

module.exports = (server) => {
    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.controllers.teams.list);

    router.post('/:id_project/:id_user',
        server.middlewares.ensureAuthenticated,
    //server.middlewares.ensureRights(0),
        server.middlewares.bodyParser.json(),
        server.controllers.teams.addMember);

    router.delete('/:id_user',
        server.middlewares.ensureAuthenticated,
    //server.middlewares.ensureRights(0),
        server.controllers.teams.removeMember);

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.controllers.teams.update);

    return router;
};