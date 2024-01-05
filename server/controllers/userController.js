const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        let user;
        // Create user
        user = new User(req.body);
        // Save user
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, videos, createdAt, updatedAt, photoURL } = req.body;
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.videos = videos;
        user.createdAt = createdAt;
        user.updatedAt = updatedAt;
        user.photoURL = photoURL;

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true });
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
        }
        await User.deleteOne({ _id: req.params.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};
