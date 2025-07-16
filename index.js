// Importar dependencias
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// Importar las rutas
import authRouter from './src/routes/auth.routes.js';
// import commissionsRouter from './src/routes/commissions.router.js';
import productsRouter from './src/routes/products.router.js';
//import usersRouter from './src/routes/users.router.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();
// Crear una instancia de Express
const APP = express();
// Configurar el puerto
const PORT = process.env.PORT || 3001;

// Configurar Middlewares
APP.use(cors());
APP.use(express.json());
APP.use(bodyParser.json());
APP.use('/auth', authRouter); // Rutas de autenticación

// Métodos predeterminados
APP.get('/favicon.ico', (req, res) => res.status(204).end());
APP.get('/', (req, res) => res.send('Mensaje: Se ejecutó el método GET en la ruta raíz ("/")'));

// Métodos de la API
// APP.use('/api', commissionsRouter); // Rutas de comisiones
APP.use('/api', productsRouter); // Rutas de productos
//APP.use('/api', usersRouter); // Rutas de usuarios
APP.use((req, res) => res.status(404).json({ 'ERROR 404': 'Recurso no encontrado' }));

// Ejecución del servidor
APP.listen(PORT, () => { console.log(`Servidor ejecutándose en http://localhost:${PORT}`) });