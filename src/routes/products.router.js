import { Router } from 'express';
import {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    replaceProduct
} from '../controllers/products.controller.js';

// Crear una instancia del enrutador
const router = Router();

// Definir las rutas y asociarlas con los controladores
router.get('/products', getAllProducts); // Mostrar todos los productos
router.get('/products/search', searchProduct); // Buscar productos con parámetros
router.get('/products/:id', getProductById); // Obtener producto por ID
router.post('/products', createProduct); // Crear un nuevo producto
router.put('/products/:id', replaceProduct); // Reemplazar producto
// router.patch('/products/:id', updateProduct); // Actualizar producto
router.delete('/products/:id', deleteProduct); // Eliminar producto

// Exportar el enrutador para su uso en otros módulos
export default router;