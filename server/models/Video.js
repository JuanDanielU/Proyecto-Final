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
    uploadDate: {
        type: Date,
        default: Date.now(),
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Object,
        default: {},
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Video', VideoSchema);