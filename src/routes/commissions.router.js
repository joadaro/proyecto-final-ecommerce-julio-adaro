import { Router } from 'express';
import { authentication } from '../middlewares/authentication.js';
import {
    getAllCommissions,
    searchCommissions,
    createCommission,
    updateCommission,
    deleteCommission
} from '../controllers/commissions.controller.js';

const router = Router(); // Crear una instancia del enrutador

// Definir las rutas y asociarlas con los controladores
router.get('/commissions', getAllCommissions); // Mostrar todas las comisiones
router.get('/commissions/search', searchCommissions); // Buscar una comisión
router.post('/commissions', authentication, createCommission); // Crear una nueva comisión (requiere autenticación)
router.patch('/commissions/:id', authentication, updateCommission); // Actualizar una comisión (requiere autenticación)
router.delete('/commissions/:id', authentication, deleteCommission); // Eliminar una comisión (requiere autenticación)

export default router;