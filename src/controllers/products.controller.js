import * as models from '../models/product.model.js';

const getAllProducts = async (req, res) => {
    const products = await models.getAllProducts();
    if (!products || products.length === 0) {
        return res.status(404).json({'ERROR 404': 'No se encontraron productos o la base de datos se encuentra vacía'});
    }
    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    let { store, name, color, size, category, status, createdAt } = req.query;
    console.log('Parámetros de búsqueda:', { store, name, color, size, category, status, createdAt });
    if (!store && !name && !color && !size && !category && !status && !createdAt) {
        return res.status(400).json({'ERROR 400': 'Debe especificar al menos un parámetro de búsqueda'});
    }
    const filteredProducts = await models.getAllProducts().filter((product) => {
        return (!store || product.store.toLowerCase().includes(store.toLowerCase())) &&
               (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
               (!color || product.color.toLowerCase().includes(color.toLowerCase())) &&
               (!size || product.size.toLowerCase().includes(size.toLowerCase())) &&
               (!category || product.category.toLowerCase().includes(category.toLowerCase())) &&
               (!status || product.status.toLowerCase() === status.toLowerCase()) &&
               (!createdAt || new Date(product.createdAt).toISOString().startsWith(createdAt));
    });
    if (filteredProducts.length === 0) {
        return res.status(404).json({'ERROR 404': 'No se encontraron productos que coincidan con los criterios de búsqueda'});
    } else {
        res.status(200).json(filteredProducts);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).json({'ERROR 400': 'El ID especificado debe ser un número entero'});
    }
    const product = await models.getProductById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({'ERROR 404': `No se encontró el producto con ID #${id}`});
    }
};

const createProduct = async (req, res) => {
    const db = await models.getAllProducts();
    const newId = parseInt(db[db.length - 1].id) + 1;
    const newProduct = {id: newId, ...req.body};
    /*
    if (!newProduct.name || !newProduct.price) {
        return res.status(400).json({'ERROR 400': 'Faltan datos requeridos'});
    }
    res.status(201).json(createdProduct);
    */
    const createdProduct = await models.createProduct(newProduct);
    res.status(200).json({'Mensaje': 'Producto creado exitosamente', 'Producto': createdProduct});
};

export {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct
    // replaceProduct,
    // modifyProduct,
    // deleteProduct
}