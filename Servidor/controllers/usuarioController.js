const Usuario = require("../models/Usuario");

// Crear un nuevo producto
exports.crearUsuario = async (req, res) => {
    try {
        usuario = new Usuario(req.body);
        await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// obtiene todos los usuarios de la base de datos
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// actualiza un usuario por su id
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, duracion } = req.body;
        let usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: 'No existe el usuario' });
        }

        usuario.nombre = nombre;
        usuario.categoria = categoria;
        usuario.ubicacion = ubicacion;
        usuario.duracion = duracion;

        usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, usuario, { new: true });
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// elimina un usuario por su id
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            res.status(404).json({ msg: 'No existe el usuario' });
        }
        // await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Usuario eliminado con exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}