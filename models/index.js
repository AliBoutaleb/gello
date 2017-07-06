const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/al-janv-db');

module.exports = (server) => {
    server.models = {
        User: require('./User'),
        Task: require('./Task'),
        Project: require('./Project'),
        Team: require('./Team'),
        Role: require('./Role')
    };
};