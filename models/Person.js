const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = Schema({
    first_name: {
        type: String,
        default: 'unknown',
        required: true
    },

    last_name: {
        type: String,
        default: 'unknown',
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    birthDate: {
        type: Date,
    }
});

module.exports = mongoose.model('Person', PersonSchema);