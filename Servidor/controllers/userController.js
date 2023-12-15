const User = require("../models/User");

// Crear un nuevo producto
exports.createUser = async (req, res) => {
    try {
        user = new User(req.body);
        await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// obtiene todos los usuarios de la base de datos
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// actualiza un usuario por su id
exports.updateUser = async (req, res) => {
    try {
        const { name, password, subscribers, location, videos } = req.body;
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'User not found' });
        }

        user.name = name;
        user.password = password;
        user.location = location;
        user.subscribers = subscribers;
        user.videos = videos;

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true });
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}
// elimina un usuario por su id
exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
        }
        // await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'User deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred');
    }
}