const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    title: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);