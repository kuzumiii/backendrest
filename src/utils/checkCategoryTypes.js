
const checkCategoryTypes = ( request, response, next ) => {
    const  category = request.body;

    const arrayOfValidation = [];

    if( typeof category.name !== "string") arrayOfValidation.push("El campo nombre debe ser un String.");
    if( typeof category.description !== "string") arrayOfValidation.push("El Description nombre debe ser un String.");
    if( typeof category.active !== "boolean") arrayOfValidation.push("El campo Active debe ser un Boolean.");

    if( arrayOfValidation.length > 0 ) {
        return response.status(400).json({
            statusCode: 400,
            message: "El categoryo tiene valores incorrectos.",
            arrayOfValidation
        })
    }

    next();
}

module.exports = checkCategoryTypes