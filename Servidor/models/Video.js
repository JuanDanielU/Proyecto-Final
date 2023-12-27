const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: false,
    },
    length: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    comments : {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Video', VideoSchema);