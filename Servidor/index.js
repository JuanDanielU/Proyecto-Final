const express = require('express');
const conectDB = require('./config/db');

// Creamos el servidor
const app = express();

// Conectamos a la base de datos
conectDB();

app.use(express.json());

app.use('/api/users', require('./routes/user'));

app.listen(4000, () => {
    console.log("Server running");
})
