module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use('/persons',  require('./persons')(server));
    server.use('/tasks',    require('./tasks')(server));
    //...
};