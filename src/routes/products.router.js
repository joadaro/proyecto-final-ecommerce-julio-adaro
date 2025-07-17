import { Router } from 'express';
import { authentication } from '../middlewares/authentication.js';
import {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';

const router = Router(); // Crear una instancia del enrutador

// Definir las rutas y asociarlas con los controladores
router.get('/products', getAllProducts); // Mostrar todos los productos
router.get('/products/search', searchProduct); // Buscar productos según parámetros
router.get('/products/:id', getProductById); // Obtener producto por id
router.post('/products', authentication, createProduct); // Crear un nuevo producto (requiere autenticación)
router.put('/products/:id', authentication, replaceProduct); // Reemplazar producto (requiere autenticación)
router.patch('/products/:id', authentication, updateProduct); // Actualizar producto (requiere autenticación)
router.delete('/products/:id', authentication, deleteProduct); // Eliminar producto (requiere autenticación)

export default router; // Exportar el enrutador para su uso en otros módulos