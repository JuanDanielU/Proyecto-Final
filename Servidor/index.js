const express = require('express');

// Creamos el servidor
const app = express();

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hola my broda');
})


app.listen(4000, () => {
    console.log("Server running");
})
