module.exports = (server) => {
    server.controllers = {
        persons: require('./users')(server),
        tasks: require('./tasks')(server)
    };
};