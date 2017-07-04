module.exports = (server) => {
    server.controllers = {
        persons: require('./persons')(server),
        tasks: require('./tasks')(server)
    };
};