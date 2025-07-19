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
// APP.use(express.static('public'));

const http_res = `
<div style="font-family: sans-serif">
    <h1>🛍️ API Rest eCommerce para el trabajo en Comisión</h1><hr>
    <h2>📄 Acerca de esta API</h2>
    <p>El desarrollo de la API está basado en comisión dentro del rubro calzado e indumentaria. Su uso está pensado para el manejo de datos de los productos solicitados por revendedores a quién trabaja en comisión. Para cada producto ingresado se fija automáticamente una comisión de acuerdo a la categoría, tipo y precio del producto, por lo que no es necesario que el usuario conozca y/o ingrese ese dato.</p>
    <p>🔗 <b>Para ver los productos haz click en el siguiente link:</b> 🔎 <a href="https://proyecto-final-ecommerce-joa.vercel.app/api/products">Ver todos los productos</a></p><hr>

    <h2>👨🏾‍💻 Información del Autor</h2>
    <ul>
        <li>🙋🏾‍♂️ Julio Oscar Adaro</li>
        <li>📧 <a href="mailto:joadaro@gmail.com">joadaro@gmail.com</a></li>
        <li>🌐 <a href="https://github.com/joadaro">https://github.com/joadaro</a></li>
    </ul>
</div>
`;

// Métodos predeterminados
APP.get('/favicon.ico', (req, res) => res.status(204).end());
APP.get('/', (req, res) => { res.redirect('/api') });
APP.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(http_res)
});

// Métodos de la API
APP.use('/api', authRouter); // Rutas de autenticación
APP.use('/api', commissionsRouter); // Rutas de comisiones
APP.use('/api', productsRouter); // Rutas de productos
APP.use((req, res) => res.status(404).json({ 'ERROR 404': 'Recurso no encontrado' }));

APP.listen(PORT, () => { console.log(`Servidor ejecutándose en http://localhost:${PORT}`) });