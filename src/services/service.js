// Modelos de la base de datos importados
const CategoryModel = require('../models/category.models'); 
const ProductModel = require('../models/product.model');
const OrderModel = require('../models/order.models');

// Logica de los servicios 

const getAllProductService = async ( request, response ) => {
    // Devuelve todos los productos o un error en caso de no poder obtenerlos
    try {
        const allProducts = await ProductModel.find();  // Busca y guarda todos los productos

        return allProducts; // Devuelve todos los productos
    } catch (error) {
        return { message: "Error al obtener los productos", satusCode: 400 }
    }
};

const getProductByIdService = async (request) => {
    try {
        const product = await ProductModel.findById(request.params.id); // Busca y guarda el producto por id
        return product; // Devuelve el producto
    } catch (error) {
        return { message: "Error al obtener el producto", statusCode: 400 };
    }
};

const getProductByCategoryService = async (request) => {
    try {
        const products = await ProductModel.find({ category: request.params.categoryId }); // Encuentra todos los productos que tengan un Category: "Request.params.categoryId" --> Siendo esto un __id de Category

        return products;    // Devuelve los productos
    } catch (error) {
        return { message: "Error al obtener los productos por categoría", statusCode: 500 };
    }
};

const addProductService = async (request) => {
    try {
        const newProduct = new ProductModel(request.body); // No es asyncrono porque viene de un request
        await newProduct.save(); // Guarda el producto y es asyncrono porque usa la DB
        return {message: 'Producto creado exitosamente', StatusCode: 201};
    } catch (error) {
        return { message: "Error al agregar el producto", statusCode: 400 };
    }
};

const updateProductService = async (request) => {
    try {
        const {id} = request.params // Id del producto a actualizar

        const productToUpdate = await ProductModel.findById(id); // busca el producto por id

        if(!productToUpdate) {
            return { message: "Auto no encontrado", satusCode: 404 }
        }

        const productChanges = request.body

        // Actualiza el producto componente por componente

        productToUpdate.name = productChanges.name;
        productToUpdate.price = productChanges.price;
        productToUpdate.category = productChanges.category;
        productToUpdate.imageURL = productChanges.imageURL;
        productToUpdate.available = productChanges.available;

        // const updatedProduct = await ProductModel.findByIdAndUpdate(request.params.id, request.body, { new: true }); // Funciona pero no se por que el tercer paramentro INVESTIGAR!!!

        await productToUpdate.save();

        return { message: "Producto actualizado exitosamente", statusCode: 201};
    } catch (error) {
        return { message: "Error al actualizar el producto", statusCode: 400 };
    }
};

const deleteProductService = async (request) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(request.params.id);

        if( !deletedProduct ) {
            return { message: "Producto no encontrado", statusCode: 404 };
        }
        
        return { message: "Producto eliminado correctamente", statusCode: 200 };
    } catch (error) {
        return { message: "Error al eliminar el producto", statusCode: 400 };
    }
};

// Orders

//GETs

const getAllOrderService = async  () => {
    try {
        const allOrder = await OrderModel.find();

        return allOrder;
        
    } catch (error) {
        return { message: "Error al obtener las ordenes.", statusCode: 400}
    }
}

const getOrderService = async ( request ) => {
    try {
        const orderById = await OrderModel.findById(request.params.id);

        return orderById;
        
    } catch (error) {
        return { message: "Error al obtener la orden", statusCode: 400};
    }
};

const addOrderService = async (request) => {
    try {
        const newOrder = new OrderModel( request.body );
        
        await newOrder.save();
        
        return { message: `Numero de orden ${newOrder.orderNumber} fue creada exitosamente`, statusCode: 201}
    } catch (error) {
        return { message: "Un error se a producido", statusCode: 400 }
    }

};

const updateOrderService = async (request) => {
    try {
        const orderToUpdate = await OrderModel.findById( request.params.id );
        
        if ( !orderToUpdate ) {
            return { message: "No se pudo encontrar la orden", statusCode: 404 };
        }

        const orderChanges = request.body;
        
        // orderNumber nunca se podra actualizar
        orderToUpdate.customer = orderChanges.customer;
        orderToUpdate.items = orderChanges.items;
        orderToUpdate.status = orderChanges.status;
        orderToUpdate.totalAmount = orderChanges.totalAmount;
        orderToUpdate.pickupTime = orderChanges.pickupTime;
        // createdAt nunca se podra actualizar
        orderToUpdate.paymentStatus = orderChanges.paymentStatus;
        orderToUpdate.paymentMethod = orderChanges.paymentMethod;
        
        orderToUpdate.save();
        
        return { message: "Orden actualizada exitosamente.", statusCode: 200 };

    } catch (error) {
        return { message: "Un error se a producido" , statusCode: 400 };
    }
};

// Servicio de categories

//GETs

const getAllCategoryService = async () => {
    try {
        const allCategories = await CategoryModel.find();  // Busca y guarda todos las categorias

        return allCategories; // Devuelve todas las categorias
    } catch (error) {
        return { message: "Error al obtener las categorias", satusCode: 400 }
    }
}


const getCategoryByIdService = async (  request ) => {
    try {
        const allCategories = await CategoryModel.findById( request.params.id );  // Busca una categoria por ID

        return allCategories; // Devuelve la categoria
    } catch (error) {
        return { message: "Error al obtener la categoria", satusCode: 400 };
    }
}
const addCategoryService = async ( request ) => {
    try {
        const newCategory = new CategoryModel( request.body );

        newCategory.save();
        return {message: 'Categoria creado exitosamente', StatusCode: 201};
    } catch (error) {
        return { message: "Error al crear la categoria", statusCode:400 };
    }
}
const updateCategoryService = async ( request, response ) => {
    try {
        const categoryToUpdate = await CategoryModel.findById( request.params.id );
        
        if ( !categoryToUpdate ) {
            return { message: "No se pudo encontrar la categoria", statusCode: 404 };
        }

        const categoryChanges = request.body;

        categoryToUpdate.name = categoryChanges.name
        categoryToUpdate.description = categoryChanges.description
        categoryToUpdate.active = categoryChanges.hasOwnProperty("active") 
            ? categoryChanges.active 
            : categoryToUpdate.active

        categoryToUpdate.save();
        
        return { message: "Categoria actualizada exitosamente.", statusCode: 200 };

    } catch (error) {
        return { message: "Un error se a producido" , statusCode: 400 };
    } 
}


const deleteCategoryService = async ( request ) => {
    try {
        const categoryToDelete = await CategoryModel.deleteOne( { _id: request.params.id } );

        
        if( !categoryToDelete.deletedCount ) {
            return { message: "Categoria no encontrado.", satusCode: 404 }
        }

        return { message: "Categoria elimina exitosamente", statusCode: 200}

    } catch (error) {
        return { message: "Un error se a producido", statusCode: 400};
    }
}

module.exports = {
    // Servicios de productos exportados

    getAllProductService,
    getProductByIdService,
    getProductByCategoryService,
    addProductService,
    updateProductService,
    deleteProductService,

    // Servicios de ordenes exportados

    getAllOrderService,
    getOrderService,
    addOrderService,
    updateOrderService,

    // Servicios de category exportados
    getAllCategoryService,
    getCategoryByIdService,
    addCategoryService,
    updateCategoryService,
    deleteCategoryService

} // Exporta el servicio