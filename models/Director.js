const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        max: 60,
        min: 1
    },
    surname: {
        type: String,
        max: 60,
        min: 1
    },
    bio: {
        type: String,
        max: 1000,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('directors', DirectorSchema);