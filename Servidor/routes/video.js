// routes for Video
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// api/Videos
router.post('/', videoController.createVideo);
router.get('/', videoController.getVideos);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;