// rutas para watchem
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// api/watchem
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;