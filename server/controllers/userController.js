const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        let user;
        // Create user
        user = new User(req.body);
        // Save user
        await user.save();
        return res.send(user);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user = new User(req.body);
        await user.save();
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};
