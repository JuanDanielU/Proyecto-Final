const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    suscriptores: {
        type: Number,
        required: true,
        default: 0,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    videos: {
        type: String,
        required: false,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);