import Express from 'express';
import cors from 'cors';
import { login } from '../controllers/auth.controller.js';

const router = Express.Router();

router.post('/login', login);

export default router;