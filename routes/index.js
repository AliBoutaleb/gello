module.exports = (server) => {
    server.use('/persons',  require('./persons')(server));
    server.use('/tasks',    require('./tasks')(server));
    //...
};