const {mongoose , Schema } = require('mongoose');

// Esquema de Producto

const ProductSchema = Schema({
    name: {             // Nombre del producto
        type: String,
        required: true
    },

    description:{       // Descripcion del producto
        type: String,
        required: true,
        default: ""
    },

    price: {            // Precio del producto
        type: Number,
        required: true
    },

    category: {         // Referencia a la categoria
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    imageURL: String,

    available: {        // Disponible o no
        type: Boolean,
        required: true
    }
});

// Modelamos el Schema -> Generamos el modelo ya listo para exportar
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel; // Exportamos el modelo