const CarModel = require('../models/car.models'); // Importar el modelo de autos

// Logica del servicio

const getAllCarService = async ( request, response ) => {
    
    try {
        const allCars = await CarModel.find() // De aca obtengo lista de autos de la DB

        return allCars;
    } catch (error) {
        return { message: "Error al obtener los autos", satusCode: 500 }
    }
}

const getCarByIdService = async ( request, response ) => {
    // Para poder encontrar un auto en la colección de autos, necesito el id del auto
    const {id} = request.params; // -> id del auto

    const carById = await CarModel.findById(id)

    if(!carById) {
        return { message: "Auto no encontrado", satusCode: 404 }
    }

    return carById;
};

const addCarService = async ( request, response ) => {
    // Consular a la DB para insertarle un autito
    // -> Que yo quiero insertar un autito tal -> por donde me viene el autito?

    const car = request.body;

    try {
        const newCar = new CarModel(car);

        await newCar.save();

        return { message: "Auto generado con exito", satusCode: 201 }
    } catch (error) {
        return { message: "Error al generar el auto", satusCode: 400 }
    }
};

const updateCarService = async ( request, response ) => {
    const {id} = request.params; // -> id del auto
    const carToEdite = request.body;

    try {
        const carById = await CarModel.findById(id);

        if(!carById) {
            return { message: "Auto no encontrado", satusCode: 404 }
        }
        console.log("car By Id", carById);
        console.log("Card to Edite", carToEdite);

        carById.marca = carToEdite.marca;
        carById.modelo = carToEdite.modelo;
        carById.anio = carToEdite.anio;
        carById.color = carToEdite.color;
        carById.precio = carToEdite.precio;

        carById.isNewCar = carToEdite.hasOwnProperty('isNewCar')
            ? carToEdite.isNewCar
            : carById.isNewCar;

        await carById.save();

        return { message: "Auto generado con exito", satusCode: 201 }
    } catch (error) {
        return { message: "Ocurrio un error", satusCode: 400 }
    }
};

const deleteCarService = async ( request, response ) => {

    const {id} = request.params; // -> id del auto

    try {
        const carToDelete = await  CarModel.deleteOne({ _id: id });

        if(!carToDelete.deletedCount) {
            return { message: "Auto no encontrado", satusCode: 404 }
        }

        return { message: "Auto eliminado con exito", satusCode: 200 }
    } catch (error) {
        return { message: "Ocurrio un error", satusCode: 400 }
    }

}

module.exports = {
    getAllCarService,
    getCarByIdService,
    addCarService,
    updateCarService,
    deleteCarService
}