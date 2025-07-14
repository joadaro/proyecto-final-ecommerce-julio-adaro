import { Router } from 'express';
import {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct
} from '../controllers/products.controller.js';

// Crear una instancia del enrutador
const router = Router();

// Definir las rutas y asociarlas con los controladores
router.get('/products', getAllProducts);
router.get('/products/search', searchProduct);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
// router.put('/products/:id', replaceProduct); // Reemplazar producto
// router.patch('/products/:id', modifyProduct); // Modificar producto
// router.delete('/products/:id', deleteProduct); // Eliminar producto

// Exportar el enrutador para su uso en otros módulos
export default router;