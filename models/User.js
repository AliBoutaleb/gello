const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
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
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    birthDate: {
        type: Date,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

module.exports = mongoose.model('User', UserSchema);