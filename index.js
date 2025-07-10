import express from 'express';

const APP = express();
const PORT = process.env.PORT || 3000;

// Métodos GET

APP.get('/favicon.ico', (req, res) => res.status(204).end());

APP.get('/', (req, res) => {
    res.send('Se ejecutó el método GET en la ruta raíz ("/")');
});

APP.get('/products', (req, res) => {
    res.send('Se ejecutó el método GET en la ruta "/products"');
});

APP.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    res.send(`Se ejecutó el método GET en la ruta "/products/${productId}"`);
});

// Métodos POST



// Métodos PUT



// Métodos DELETE



// Métodos PATCH



// Configuración del servidor

APP.use(express.json());
APP.listen(PORT, () => { console.log(`Servidor ejecutándose en http://localhost:${PORT}`) });