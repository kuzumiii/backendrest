
const checkProductTypes = ( request, response, next ) => {
    const  product = request.body;

    const arrayOfValidation = [];

    if( typeof product.name === "string") arrayOfValidation.push("El campo nombre debe ser un String.");
    if( typeof product.price === "number") arrayOfValidation.push("El campo nombre debe ser un Number.");
    if( product.price < 0 ) arrayOfValidation.push("El campo precio no puede ser menor a 0");
    if( typeof product.category === "Schema.Types.ObjectId") arrayOfValidation.push("El campo category debe ser una Categoria.");
    if( typeof product.imageURL === "string") arrayOfValidation.push("El campo Imagen debe ser un String .");
    if( typeof product.available === "boolean") arrayOfValidation.push("El campo available debe ser un Boolean.");

    if( arrayOfValidation.length == 0 ) {
        return response.status(400).json({
            statusCode: 400,
            message: "El producto tiene valores incorrectos.",
            arrayOfValidation
        })
    }

    next();
}

module.exports = checkProductTypes