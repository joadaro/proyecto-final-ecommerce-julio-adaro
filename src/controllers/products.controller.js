import * as models from '../models/product.model.js';
import { getCommission } from '../services/commissions.service.js';

const getAllProducts = async (req, res) => {
    const products = await models.getAllProducts();
    if (!products || products.length === 0) {
        return res.status(404).json({'Error 404': 'No se encontraron productos o la base de datos se encuentra vacía'});
    }
    console.log(`Mensaje: Se encontraron ${products.length} productos`);
    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    const { article, category, client, color, priority, size, status, store } = req.query;
    if ( !article && !category && !client && !color && !priority && !size && !status && !store ) {
        return res.status(400).json({'Error 400': 'Debe especificar al menos un parámetro de búsqueda'});
    }
    if (client && (!isNaN(client) || client.length != 4)) {
        return res.status(400).json({'Error 400': 'El id de cliente indicado como parámetro de búsqueda no es válido'});
    }
    if (status && status !== 'pendiente' && status !== 'cancelado' && status !== 'reservado' && status !== 'comprado' && status != 'recibido'){
        return res.status(400).json({'Error 400': 'El estado de producto indicado como parámetro de búsqueda no es válido'});
    }
    const filteredProducts = await models.searchProducts(req.query);
    if (!filteredProducts || filteredProducts.length === 0) {
        console.log('Error: No se encontraron productos que coincidan con los criterios de búsqueda');
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
        console.log(`Mensaje: Se encontró el producto con el id especificado`);
        res.status(200).json(product);
    } else {
        res.status(404).json({'Error 404': `No se encontró el producto con el id especificado`});
    }
};

const createProduct = async (req, res) => {
    // Datos requeridos para la creación de un producto: article , category, client, color, details, price, size, store
    const { article, category, client, color, details, price, size, store } = req.body;
    if (!client || !isNaN(client) || client.length !== 4) {
        return res.status(400).json({'Error 400': 'El id de cliente indicado no es válido'});
    }
    if ( !article || !category || !store ) {
        return res.status(400).json({'Error 400': 'Faltan datos requeridos para crear el producto'});
    }
    const params = { article: article, category: category, price: price };
    // Estructura del nuevo producto...
    const newProduct = {
        article: article,                           // Dato obligatorio *
        category: category,                         // Dato obligatorio *
        client: client,                             // Dato obligatorio *
        color: (color) ? color : "",                // Dato requerido
        commission: await getCommission(params),    // Valor incrustado por código
        createdAt: new Date(),                      // Fecha incrustada por código
        details: (details) ? details : "",          // Dato requerido
        price: (price) ? price : 0,                 // Dato requerido
        priority: "normal",                         // Valor por defecto incrustado por código
        size: (size) ? size : "",                   // Dato requerido
        status: "pendiente",                        // Valor inicial por defecto incrustado por código
        store: store                                // Dato obligatorio *
    }
    const createdProduct = await models.createProduct(newProduct);
    console.log(createdProduct);
    console.log('Mensaje: Producto creado exitosamente');
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
    updatedProduct.commision = await getCommission(newProduct); // Buscar y guardar la comisión por el producto
    const result = await models.replaceProduct(id, updatedProduct); // Reemplazar los datos del producto
    console.log(result);
    if (result && result != 403) {
        console.log(`Mensaje: Producto con id '${id}' actualizado exitosamente.`);
        res.status(200).json({'Mensaje': 'Producto actualizado exitosamente.', 'Producto': result});
    } else if (result == 403) {
        console.log('Error: El estado actual del producto no permite el reemplazo del registro.');
        res.status(403).json({'Error 403': `El estado actual del producto no permite el reemplazo del registro.`});
    } else {
        console.log(`Error: No se encontró el producto con id ${id}`);
        res.status(404).json({'Error 404': `No se encontró producto con id ${id}`});
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    const { idClient, status } = updatedProduct;
    if (idClient && (!isNaN(idClient) || idClient.length !== 4)) {
        console.log(`Error: Se especificó un id de cliente no válido. No se puede actualizar.`);
        return res.status(400).json({'Error 400': 'El id de cliente indicado no es válido'});
    }
    if (status && status !== 'pendiente' && status !== 'cancelado' && status !== 'reservado' && status !== 'comprado' && status != 'recibido') {
        console.log(`Error: Se especificó un estado de producto no válido. No se puede actualizar.`);
        return res.status(400).json({'Error 400': 'El estado indicado para el producto no es válido'});
    }
    const result = await models.updateProduct(id, updatedProduct);
    if (result) {
        console.log(`Mensaje: Producto con id "${id}" actualizado exitosamente`);
        res.status(200).json({'Mensaje': 'Producto actualizado exitosamente', 'Producto': result});
    } else {
        console.log(`Error: No se encontró el producto con id ${id}`);
        res.status(404).json({'Error 404': `No se encontró el producto con el id especificado`});
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await models.getProductById(id);
        if (!product) {
            return res.status(404).json({'Error 404': `No se encontró producto con id ${id}`});
        }
        const result = await models.deleteProduct(id);
        if (result == 403) {
            console.log('Error: No es posible eliminar el producto debido a su estado actual. Intente primero modificar su estado.')
            res.status(403).json({'Error 403': `El estado actual del producto no permite la eliminación del registro.`});
        } else {
            console.log(`Mensaje: Producto con id '${id}' eliminado exitosamente`);
            res.status(200).json({'Mensaje': 'Producto eliminado exitosamente'});
        }
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