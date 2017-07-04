const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/al-janv-db');

module.exports = (server) => {
    server.models = {
        Person: require('./Person'),
        Task: require('./Task')
    };
};