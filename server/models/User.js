const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id : {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    subscribers: {
        type: Array,
        default: [],
    
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    videos: {
        type: Object,
        default: {},
    },
});

module.exports = mongoose.model('User', UserSchema);