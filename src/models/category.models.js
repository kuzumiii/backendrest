const { mongoose, Schema } = require("mongoose");

// Esquemita de Categoria

const CategorySchema = Schema({
    name: {                 // Nombre de la categoria ----> Ej.: Plato Principa / Guarnision / Bebidas / Postre
        type: String,
        required: true
    },
    description: String,    // Opcional
    active: {               // Activo o desactica la categoria
        type: Boolean,
        required: true,
        default: true
    }
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel; // Exportamos el modelo