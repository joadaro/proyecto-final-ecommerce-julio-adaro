import * as models from '../models/product.model.js';

const getAllProducts = (req, res) => {
    const products = models.getAllProducts();
    res.json(products);
};

const searchProduct = (req, res) => {
    console.log(req.query);
    // Aquí podrías implementar la lógica de búsqueda de productos
    res.send('Se ejecutó el método GET en la ruta "/products/search"');
};

const getProductById = (req, res) => {
    const id = req.params.id;
    const product = models.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({'ERROR 404': `No se encontró el producto con ID #${id}`});
    }
};

export {
    getAllProducts,
    searchProduct,
    getProductById
}