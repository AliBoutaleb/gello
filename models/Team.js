const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    members:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Team', TeamSchema);