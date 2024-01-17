const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: true,
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
        required: true,
    },
    videoId: {
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
    likes: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Comment', CommentSchema);
