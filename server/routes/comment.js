const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

// api/comments
router.post('/', commentController.createComment); // Create comment
router.get('/', commentController.getComments); // Get all comments
router.get('/:id', commentController.getCommentsByVideoId); // Get comments by video id
router.get('/:id', commentController.getComment); // Get comment by id
router.put('/:id', commentController.updateComment); // Update comment
router.delete('/:id', commentController.deleteComment); // Delete comment

module.exports = router;