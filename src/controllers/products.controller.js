import * as models from '../models/product.model.js';

const getAllProducts = async (req, res) => {
    const products = await models.getAllProducts();
    if (!products || products.length === 0) {
        return res.status(404).json({'Error 404': 'No se encontraron productos o la base de datos se encuentra vacía'});
    }
    console.log(`Mensaje: Se encontraron ${products.length} productos`);
    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    let { store, article, color, size, category, status, idClient } = req.query;
    if (!store && !article && !color && !size && !category && !idClient && !status) {
        return res.status(400).json({'Error 400': 'Debe especificar al menos un parámetro de búsqueda'});
    }
    if ((idClient) && (!isNaN(idClient) || idClient.length != 4)) {
        return res.status(400).json({'Error 400': 'El id de cliente indicado como parámetro de búsqueda no es válido'});
    }
    if (status && status !== 'pendiente' && status !== 'cancelado' && status !== 'reservado' && status !== 'comprado' && status != 'recibido'){
        return res.status(400).json({'Error 400': 'El estado de producto indicado como parámetro de búsqueda no es válido'});
    }
    const filteredProducts = await models.searchProducts(req.query);
    if (!filteredProducts || filteredProducts.length === 0) {
        return res.status(404).json({'Error 404': 'No se encontraron productos que coincidan con los criterios de búsqueda'});
    } else {
        console.log(`Mensaje: Se encontraron ${filteredProducts.length} productos que coinciden con los criterios de búsqueda`);
        res.status(200).json(filteredProducts);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await models.getProductById(id);
    if (product) {
        console.log(`Mensaje: Se encontró el producto con el id especificado (id: ${id})`);
        res.status(200).json(product);
    } else {
        res.status(404).json({'Error 404': `No se encontró el producto con el id especificado`});
    }
};

const createProduct = async (req, res) => {
    const newProduct = {...req.body, status: 'pendiente', createdAt: new Date().toISOString()};
    // const newProduct = {...req.body};
    const { store, article, category, idClient } = newProduct;
    if (!idClient || !isNaN(idClient) || idClient.length !== 4) {
        // El id del cliente debe contener 4 cacacteres alfabéticos
        return res.status(400).json({'Error 400': 'El id de cliente indicado no es válido'});
    }
    if (!store || !article || !category) {
        // Los datos de 'store' (nombre de la tienda), 'article' (nombre del artículo) y 'category' (categoría) son obligatorios
        return res.status(400).json({'Error 400': 'Faltan datos requeridos para crear el producto'});
    }
    const createdProduct = await models.createProduct(newProduct);
    res.status(200).json({'Mensaje': 'Producto creado exitosamente', 'Producto': createdProduct});
};

const replaceProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = {...req.body, status: 'pendiente', createdAt: new Date().toISOString()};
    const { store, article, category, price, commission, idClient } = updatedProduct;
    if (!idClient || !isNaN(idClient) || idClient.length !== 4) {
        return res.status(400).json({'Error 400': 'El id de cliente indicado no es válido'});
    }
    if (!store || !article || !category || !price || !commission) {
        return res.status(400).json({'Error 400': 'Faltan datos requeridos para reemplazar el producto'});
    }
    console.log(`Actualizando producto con ID: ${id}`, updatedProduct);
    const result = await models.replaceProduct(id, updatedProduct);
    console.log(result);
    if (result && result != 403) {
        res.status(200).json({'Mensaje': 'Producto actualizado exitosamente', 'Producto': result});
    } else if (result == 403) {
        res.status(403).json({'Error 403': `El estado actual del producto no permite el reemplazo del registro`});
    } else {
        res.status(404).json({'Error 404': `No se encontró producto con id ${id}`});
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    const { idClient, status } = updatedProduct;
    if (idClient && (!isNaN(idClient) || idClient.length !== 4)) {
        return res.status(400).json({'Error 400': 'El id de cliente indicado no es válido'});
    }
    if (status && (status !== 'pendiente' || status !== 'cancelado' || status !== 'reservado' || status !== 'comprado' || status != 'recibido')) {
        return res.status(400).json({'Error 400': 'El estado indicado para el producto no es válido'});
    }
    console.log(`Actualizando producto con id '${id}'`, updatedProduct);
    const result = await models.updateProduct(id, updatedProduct);
    if (result) {
        res.status(200).json({'Mensaje': 'Producto actualizado exitosamente', 'Producto': result});
    } else {
        res.status(404).json({'Error 404': `No se encontró el producto con id ${id} o no existe el producto`});
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await models.getProductById(id);
        if (!product) {
            return res.status(404).json({'Error 404': `No se encontró producto con id ${id}`});
        }
        await models.deleteProduct(id);
        res.status(200).json({'Mensaje': 'Producto eliminado exitosamente'});
    } catch (error) {
        console.error(`Error al eliminar producto con id ${id}:`, error);
        res.status(500).json({'Error 500': 'Error interno del servidor al eliminar el producto'});
    }
};

export {
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}