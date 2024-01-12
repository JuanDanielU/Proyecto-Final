const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    comments: {
        type: Object,
        default: {},
    },
    likes: {
        type: Array,
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
    fromUser: {
        type: String,
        required: true,
    },
    userPhoto: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Video', VideoSchema);