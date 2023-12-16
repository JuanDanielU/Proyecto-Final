const Video = require('../models/Video');

// Crear un nuevo video
exports.createVideo = async (req, res) => {
    try {
        video = new Video(req.body);
        await video.save();
        res.send(video);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// obtiene todos los videos de la base de datos
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// actualiza un video por su id
exports.updateVideo = async (req, res) => {
    try {
        const { title, description, timelength, likes, comments, url, uploadDate } = req.body;
        let video = await Video.findById(req.params.id);

        if (!video) {
            res.status(404).json({ msg: 'Video not found' });
        }

        video.title = title;
        video.description = description;
        video.timelength = timelength;
        video.likes = likes;
        video.comments = comments;
        video.url = url;
        video.uploadDate = Date.now();

        video = await Video.findOneAndUpdate({ _id: req.params.id }, video, { new: true });
        res.json(video);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// elimina un video por su id
exports.deleteVideo = async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);
        if (!video) {
            res.status(404).json({ msg: 'Video not found' });
        }
        res.json({msg: 'Video deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}