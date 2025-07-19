// Importar dependencias
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// Importar las rutas
import authRouter from './src/routes/auth.routes.js';
import commissionsRouter from './src/routes/commissions.router.js';
import productsRouter from './src/routes/products.router.js';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env
const APP = express(); // Crear una instancia de Express
const PORT = process.env.PORT || 3001; // Configurar el puerto

// Configurar Middlewares
APP.use(cors());
APP.use(express.json());
APP.use(bodyParser.json());

// Métodos predeterminados
APP.get('/favicon.ico', (req, res) => res.status(204).end());
APP.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.redirect('/public/index.html');
    return;
    //res.send('¡Te damos la Bienvenida a esta API realizada para el trabajo en Comisión!')
});

// Métodos de la API
APP.use('/api', authRouter); // Rutas de autenticación
APP.use('/api', commissionsRouter); // Rutas de comisiones
APP.use('/api', productsRouter); // Rutas de productos
APP.use((req, res) => res.status(404).json({ 'ERROR 404': 'Recurso no encontrado' }));

APP.listen(PORT, () => { console.log(`Servidor ejecutándose en http://localhost:${PORT}`) });