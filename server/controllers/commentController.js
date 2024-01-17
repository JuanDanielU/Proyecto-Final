const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        let comment;
        // Create comment
        comment = new Comment(req.body);
        // Save comment
        await comment.save();
        return res.send(comment);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.id });
        return res.json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        return res.json(comment);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.updateComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        comment = new Comment(req.body);
        await Comment.findByIdAndUpdate(req.params.id, { $set: comment }, { new: true });
        return res.json(comment);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        await Comment.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Comment removed' });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};