import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Express
const APP = express();
// Configurar el puerto
const PORT = process.env.PORT || 3001;

// Importar las rutas de la API
import productsRouter from './src/routes/products.router.js';
//import usersRouter from './src/routes/users.router.js';

// Métodos predeterminados
APP.get('/favicon.ico', (req, res) => res.status(204).end());
APP.get('/', (req, res) => res.send('Mensaje: Se ejecutó el método GET en la ruta raíz ("/")'));

// Métodos de la API
APP.use('/api', productsRouter);
//APP.use('/api', usersRouter);
APP.use((req, res) => res.status(404).json({ 'ERROR 404': 'Recurso no encontrado' }));

// Configuración del Servidor
APP.use(cors());
APP.use(express.json());
APP.listen(PORT, () => { console.log(`Servidor ejecutándose en http://localhost:${PORT}`) });