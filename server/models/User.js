const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    photoURL: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('User', UserSchema);