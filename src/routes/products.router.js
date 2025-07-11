import { Router } from 'express';

const router = Router();

import {
    getAllProducts,
    searchProduct,
    getProductById
} from '../controllers/products.controller.js';

router.get('/products', getAllProducts);
router.get('/products/search', searchProduct);
router.get('/products/:id', getProductById);

export default router;