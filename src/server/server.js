// Logica del controlador (insertar producto en DB)
const express = require('express');
const router = require('../routes/routes');

// Configurar el servidor
const server = express();
server.use(express.json()); // Le permite al servidor entender JSON

// Configuracion de los router -> delegado -> routers
server.get('/', ( request, response) => {
    response.send('Bienvenidos a mi servidor');
})
// Ejecutar los routers
server.use('/', router); 

module.exports = server;