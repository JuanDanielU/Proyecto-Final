const Producto = require("../models/Usuario");

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// obtiene todos los productos de la base de datos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// actualiza un producto por su id
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, duracion } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.duracion = duracion;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// elimina un producto por su id
exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        // await Producto.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Producto eliminado con exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}