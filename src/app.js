// Importa el servidor
const server = require("./server/server");
require('./database/config');
// Accedemos a la hoja de .env
require('dotenv').config(); // Carga las variables de entorno

// Definido al puerto
const PORT = process.env.PORT || 8080;

// Delega la creacion del servidor -> server.js


// Escucha el servidor ( ejecucion en el puerto tal)

server.listen(PORT, () => console.log(`Server funcionando en port: ${PORT}`) ); // Escucha el servidor en el puerto definido')