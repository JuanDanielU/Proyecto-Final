const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
    try {
        let video;
        // Create video
        video = new Video(req.body);
        // Save video
        await video.save();
        return res.send(video);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        return res.json(videos);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getVideo = async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);
        if (!video) {
            res.status(404).json({ msg: 'Video not found' });
        }
        return res.json(video);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getLikedVideos = async (req, res) => {
    try {
        const videos = await Video.find({ likes: req.params.id });
        if (!videos) {
            res.status(404).json({ msg: 'Videos not found' });
        }
        return res.json(videos);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const { title, description, uploadDate, views, likes, comments, userPhoto, userId, fromUser, url } = req.body;
        let video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ msg: 'Video not found' });
        }

        video.title = title;
        video.description = description;
        video.uploadDate = uploadDate;
        video.views = views;
        video.likes = likes;
        video.comments = comments;
        video.userId = userId;
        video.fromUser = fromUser;
        video.userPhoto = userPhoto;
        video.url = url;

        video = await Video.findOneAndUpdate({ _id: req.params.id }, video, { new: true });
        return res.json(video);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ msg: 'Video not found' });
        }
        await Video.deleteOne({ _id: req.params.id });
        return res.json({ msg: 'Video deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};
