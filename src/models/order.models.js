const { mongoose, Schema } = require('mongoose');

const orderSchema = Schema({
    orderNumber: {        // Numero de pedido unico
        type: Number,
        required: true,
        unique: true
    },

    customer: {           // Datos del cliente
        name: {
            type: String,
            required: true
        },

        phone:{
            type: Number,
            required: true
        },

        email: String
    },
    // Lista de productos con estos datos (product, quantity, price) cada uno
    items: [{            // Lista de productos
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        quantity: {     // Cantidad de productos
            type: Number,
            required: true,
            min : 1
        },

        price: {        // Precio del producto unitario
            type: Number,
            required: true
        }
    }],

    status: {   // Estado del pedido
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
      },

      totalAmount: {        // Monto total del pedido
        type: Number,
        required: true
      },

      pickupTime: {         // Fecha de creacion del pedido
        type: Date,
        default: () => new Date(Date.now() + 20 * 60 * 1000)  // 20 minutos para recojer el pedido 
      },
      createdAt: {          // Fecha de creacion del pedido
        type: Date,
        default: Date.now
      },

      paymentStatus: {      // Estado del pago
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
      },

      paymentMethod: {      // Metodo de pago
        type: String,
        default: 'cash'
      }

});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel; // Exportamos el modelo