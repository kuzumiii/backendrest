
const { 
    // Servicios de productos importados

    getAllProductService,
    getProductByIdService,
    getProductByCategoryService,
    addProductService,
    updateProductService,
    deleteProductService,

    // Servicios de ordenes importados

    getAllOrderService,
    getOrderService,
    updateOrderService,
    addOrderService,

    // Servicios de Categoria importados
    getAllCategoryService,
    getCategoryByIdService,
    addCategoryService,
    updateCategoryService,
    deleteCategoryService
    
} = require('../services/service'); 

// Controlador de productos

// GETs

const getAllProductController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const allProducts = await getAllProductService( request );

    // Retornamos la respuesta al Front End
    response.json( allProducts );
}

const getProductByIdController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const productById = await getProductByIdService( request );

    // Retornamos la respuesta al Front End
    response.json( productById );
}

const getProductByCategoryController = async ( request, response) => {
    // Delegamos la logica a los servicios
    const productByCategory = await getProductByCategoryService( request );

    // Retornamos la respuesta al Front End
    response.json( productByCategory );
}

// POSTs

const addProductController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const newProduct = await addProductService( request );

    // Retornamos la respuesta al Front End
    response.json( newProduct );
}

// PUTs

const updateProductController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const productToUpdate = await updateProductService( request );

    // Retornamos la respuesta al Front End
    response.json( productToUpdate );
}

// DELETEs

const deleteProductController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const productToDelete = await deleteProductService( request );

    // Retornamos la respuesta al Front End
    response.json( productToDelete );
}

// Controlador de ordenes

// GETs

const getAllOrderController = async ( request, response ) => {
    
    const allOrders = await getAllOrderService( request );

    response.json( allOrders );
}

const getOrderController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const ordersById = await getOrderService( request );

    // Retornamos la respuesta al Front End
    response.json( ordersById );
}

// PUTs

const updateOrderController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const orderToUpdate = await updateOrderService( request );

    // Retornamos la respuesta al Front End
    response.json( orderToUpdate );
}

// POSTs

const addOrderController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const newOrder = await addOrderService( request );

    // Retornamos la respuesta al Front End
    response.json( newOrder );
}

// Categories

// GETs

const getAllCategoryController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const allCategory = await getAllCategoryService( request );

    // Retornamos la respuesta al Front End
    response.json( allCategory );
}

const  getCategoryByIdController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const categoryById = await getCategoryByIdService( request );

    // Retornamos la respuesta al Front End
    response.json( categoryById );
}

const addCategoryController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const newCategory = await addCategoryService( request );

    // Retornamos la respuesta al Front End
    response.json( newCategory );
}

const updateCategoryController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const updatedCategory = await updateCategoryService( request );

    // Retornamos la respuesta al Front End
    response.json( updatedCategory );
}

const deleteCategoryController = async ( request, response ) => {
    // Delegamos la logica a los servicios
    const orderToDelete = await deleteCategoryService( request );

    // Retornamos la respuesta al Front End
    response.json( orderToDelete );
}


module.exports = {
    // Productos
    getAllProductController,
    getAllProductController,
    getProductByCategoryController,
    getProductByIdController,

    addProductController,

    updateProductController,

    deleteProductController,

    // Ordenes

    getAllOrderController,
    getOrderController,

    addOrderController,

    updateOrderController,

    // Category
    getAllCategoryController,
    getCategoryByIdController,

    addCategoryController,

    updateCategoryController,

    deleteCategoryController

};