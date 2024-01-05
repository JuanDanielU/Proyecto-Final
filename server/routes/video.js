const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// api/videos
router.post('/', videoController.createVideo); // Create video
router.get('/', videoController.getVideos); // Get all videos
router.put('/:id', videoController.updateVideo); // Update video
router.get('/:id', videoController.getVideo); // Get video
router.delete('/:id', videoController.deleteVideo); // Delete video


module.exports = router;