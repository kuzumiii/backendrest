//Importamos Mongoose para habilitar metodos de conexion a la base de datos
const mongoose = require('mongoose');
require('dotenv').config();

// Tenemos acceso al enlace de conecccion a la base de datos
const DATABASE = process.env.DATABASE_URL;

//Configuramos la conexion a la base de datos

const connect = async  () => {
    try {
        await mongoose.connect(DATABASE, {
            serverSelectionTimeoutMS: 30000 // 30 segundos
        }).then( () => {
            console.log('Conectado a MongoDB');
        })
    }
    catch (error) {
        console.log('Error al conectar a la base de datos', error);
    }
};

connect();