import * as models from '../models/product.model.js';

const getAllProducts = async (req, res) => {
    const products = await models.getAllProducts();
    if (!products || products.length === 0) {
        return res.status(404).json({'ERROR 404': 'No se encontraron productos o la base de datos se encuentra vacía'});
    }
    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    let { store, article, color, size, category, status, idClient } = req.query;
    console.log('Parámetros de búsqueda:', { store, article, color, size, category, status, idClient });
    if (!store && !article && !color && !size && !category && !status && !idClient) {
        return res.status(400).json({'ERROR 400': 'Debe especificar al menos un parámetro de búsqueda'});
    }
    if ((idClient) && (!isNaN(idClient) || idClient.length != 4)) {
        return res.status(400).json({'ERROR 400': 'El ID de cliente debe ser de tipo alfabético y contener 4 letras'});
    }
    const filteredProducts = await models.searchProducts(req.query);
    if (filteredProducts.length === 0) {
        return res.status(404).json({'ERROR 404': 'No se encontraron productos que coincidan con los criterios de búsqueda'});
    } else {
        res.status(200).json(filteredProducts);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await models.getProductById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({'ERROR 404': `No se encontró producto con id ${id}`});
    }
};

const createProduct = async (req, res) => {
    // const newProduct = {...req.body, status: 'pendiente', createdAt: new Date().toISOString()};
    const newProduct = {...req.body};
    console.log('Nuevo producto recibido:', newProduct);
    const { store, article, category, idClient } = newProduct;
    if (!idClient || !isNaN(idClient) || idClient.length !== 4) {
        return res.status(400).json({'ERROR 400': 'El ID de cliente debe ser de tipo alfabético y contener 4 letras'});
    }
    if (!store || !article || !category) {
        return res.status(400).json({'ERROR 400': 'Faltan datos requeridos para crear el producto'});
    }
    const createdProduct = await models.createProduct(newProduct);
    res.status(200).json({'Mensaje': 'Producto creado exitosamente', 'Producto': createdProduct});
};

const replaceProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    // Validar que exista el ID del producto
    // Validar que se envíen todos los campos necesarios
    console.log(`Actualizando producto con ID: ${id}`, updatedProduct);
    const result = await models.replaceProduct(id, updatedProduct);
    if (result) {
        res.status(200).json({'Mensaje': 'Producto actualizado exitosamente', 'Producto': result});
    } else {
        res.status(404).json({'ERROR 404': `No se encontró producto con id ${id}`});
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await models.getProductById(id);
        if (!product) {
            return res.status(404).json({'ERROR 404': `No se encontró producto con id ${id}`});
        }
        await models.deleteProduct(id);
        res.status(200).json({'Mensaje': 'Producto eliminado exitosamente'});
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
        res.status(500).json({'ERROR 500': 'Error interno del servidor al eliminar el producto'});
    }
};

export {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    replaceProduct,
    // updateProduct,
    deleteProduct
}