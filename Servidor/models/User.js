const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscribers: {
        type: Number,
        required: true,
        default: 0,
    },
    location: {
        type: String,
        required: true,
    },
    videos: {
        type: String,
        required: false,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', UserSchema);