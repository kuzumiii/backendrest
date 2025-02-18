const express = require("express");
const { 
    // Productos
    getAllProductController,
    getProductByIdController,
    getProductByCategoryController,
    
    addProductController,

    updateProductController,

    deleteProductController,

    // Ordenes
    getAllOrderController,
    getOrderController,
    
    addOrderController,
    
    updateOrderController,

    // Categorys
    getAllCategoryController,
    getCategoryByIdController,

    addCategoryController,

    updateCategoryController,

    deleteCategoryController

    } = require("../controllers/controller"); // Importar el controlador

const checkProductTypes  = require("../utils/checkProductTypes");
const checkOrderTypes = require("../utils/checkOrderTypes");
const checkCategoryTypes = require("../utils/checkCategoryTypes");
const checkProductImageTypes = require("../utils/checkProductImage");

const router = express.Router();


// Rutas de productos -> delegado -> controller

router.get("/product", getAllProductController); // Ruta para obtener todos los productos
router.get("/product/:id", getProductByIdController); // Ruta para obtener un producto
router.get("/product/category/:categoryId", getProductByCategoryController); // Ruta para obtener un producto por categoria

router.post("/product", checkProductTypes, checkProductImageTypes, addProductController); // Ruta para agregar un producto

router.put("/product/:id", checkProductTypes, updateProductController); // Ruta para modificar un producto

router.delete("/product/:id", deleteProductController); // Ruta para eliminar un producto

// // Rutas de orden -> delegado -> controller

router.get("/order/", getAllOrderController); // Ruta para obtener todas las ordenes
router.get("/order/:id", getOrderController); // Ruta para obtener una orden por id

router.post("/order", checkOrderTypes, addOrderController); // Ruta para agregar una orden

router.put("/order/:id", checkOrderTypes, updateOrderController); // Ruta para modificar una orden

// Rutas de categoryas -> delegado -> Controller

router.get("/categories/", getAllCategoryController);
router.get("/categories/:id", getCategoryByIdController);

router.post("/categories/", checkCategoryTypes, addCategoryController);

router.put("/categories/:id", checkCategoryTypes, updateCategoryController);

router.delete("/categories/:id", deleteCategoryController);

// Logica de las rutas -> delegado -> controller

module.exports = router; // Exporta el router
