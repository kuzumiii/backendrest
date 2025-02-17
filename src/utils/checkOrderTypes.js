const mongoose = require('mongoose');

const checkOrderTypes = ( request, response, next ) => {
    const  order = request.body;

    const arrayOfValidation = [];

    if( typeof order.orderNumber !== "number") arrayOfValidation.push("El campo OrderNumber debe ser un Number.");
    if( typeof order.customer !== "object" ) {
        arrayOfValidation.push("El campo Customer debe ser un Object."); 
    }
    else{
        if( typeof order.customer.name !== "string" ) arrayOfValidation.push("El campo Name debe ser un String.");
        if( typeof order.customer.phone !== "number" ) arrayOfValidation.push("El campo Phone debe ser un Number.");
        if( order.customer.email && typeof order.customer.email !== "string" ) arrayOfValidation.push("El campo Email debe ser un String.");
    }

    if (!Array.isArray(order.items)) {
        arrayOfValidation.push("El campo items debe ser un array.");
    } else {
        order.items.forEach((item, index) => {
            if (typeof item !== 'object' || item === null) {
                arrayOfValidation.push(`El item en la posición ${index} debe ser un objeto.`);
            } else {
                // Validar product (ObjectId)
                if (!mongoose.Types.ObjectId.isValid(item.product)) {
                    arrayOfValidation.push(`El campo product en el item ${index} debe ser un ObjectId válido.`);
                }
                // Validar quantity
                if (typeof item.quantity !== 'number' || item.quantity < 1) {
                    arrayOfValidation.push(`El campo quantity en el item ${index} debe ser un número mayor o igual a 1.`);
                }
                // Validar price
                if (typeof item.price !== 'number') {
                    arrayOfValidation.push(`El campo price en el item ${index} debe ser un número.`);
                }
            }
        });
    }

    // Validar status
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(order.status)) {
        errors.push(`El campo status debe ser uno de los siguientes: ${validStatuses.join(', ')}.`);
    }

    // Validar totalAmount
    if (typeof order.totalAmount !== 'number') {
        errors.push("El campo totalAmount debe ser un número.");
    }

    // Validar paymentStatus
    const validPaymentStatuses = ['pending', 'paid'];
    if (!validPaymentStatuses.includes(order.paymentStatus)) {
        errors.push(`El campo paymentStatus debe ser uno de los siguientes: ${validPaymentStatuses.join(', ')}.`);
    }

    // Validar paymentMethod
    if (typeof order.paymentMethod !== 'string') {
        errors.push("El campo paymentMethod debe ser un string.");
    }

    // Si hay errores, devolverlos

    if( arrayOfValidation.length > 0 ) {
        return response.status(400).json({
            statusCode: 400,
            message: "El order tiene valores incorrectos.",
            arrayOfValidation
        })
    }

    next();
}

module.exports = checkOrderTypes