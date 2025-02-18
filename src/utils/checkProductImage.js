const randomImageFood = require("../APIs/randomFoodImage");

const checkProductImageTypes = async (request, response, next) => {
  const product = request.body;

  try {
    // Verificar si imageURL está vacío
    if (!product.imageURL || product.imageURL === "") {
      // Asignar una nueva imagen aleatoria
      product.imageURL = await randomImageFood();

      // Almacenar un mensaje en response.locals para enviarlo en la respuesta final
      response.locals.message = "Imagen creada aleatoriamente";
    }

    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener la imagen aleatoria:", error);
    response.status(500).json({
      message: "Error al generar la imagen aleatoria",
      error: error.message,
    });
  }
};

module.exports = checkProductImageTypes;
