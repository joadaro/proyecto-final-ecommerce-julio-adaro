import * as models from '../models/product.model.js';
import { getCommission } from '../services/commissions.service.js';

const getAllProducts = async (req, res) => {
    const products = await models.getAllProducts();
    if (!products || products.length === 0) {
        const msg = `No se encontraron productos o la base de datos se encuentra vacía`;
        console.log(`Error: ${msg}`);
        return res.status(404).json({'Error 404': msg});
    }
    console.log(`Mensaje: Se encontraron ${products.length} productos`);
    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    const { article, category, client, color, priority, size, status, store } = req.query;
    let errormsg = 'error desconocido';
    if ( !article && !category && !client && !color && !priority && !size && !status && !store ) {
        errormsg = `Debe especificar al menos un parámetro de búsqueda`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if (client && (!isNaN(client) || client.length != 4)) {
        errormsg = `El id de cliente indicado como parámetro no es válido`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if (status && status !== 'pendiente' && status !== 'cancelado' && status !== 'reservado' && status !== 'comprado' && status != 'recibido'){
        errormsg = `El estado de producto indicado como parámetro no es válido`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    const filteredProducts = await models.searchProducts(req.query);
    if (!filteredProducts || filteredProducts.length === 0) {
        errormsg = `No se encontraron productos que coincidan con los criterios de búsqueda`;
        console.log(`Error: ${errormsg}`);
        return res.status(404).json({'Error 404': errormsg});
    } else {
        console.log(`Mensaje: Se encontraron ${filteredProducts.length} productos que coinciden con los criterios de búsqueda`);
        res.status(200).json(filteredProducts);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await models.getProductById(id);
    if (product) {
        console.log(product);
        res.status(200).json(product);
    } else {
        const errormsg = `No se encontró el producto con el id especificado`;
        console.log(`Error: ${errormsg}`);
        res.status(404).json({'Error 404': errormsg});
    }
};

const createProduct = async (req, res) => {
    // Datos requeridos para la creación de un producto: article , category, client, color, details, price, size, store
    const { article, category, client, color, date, details, price, size, status, store } = req.body;
    let errormsg = 'Error desconocido';
    if (!client || !isNaN(client) || client.length !== 4) {
        errormsg = `El id de cliente indicado como parámetro no es válido`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if ( !article || !category || !store ) {
        errormsg = `Faltan datos requeridos para crear el producto`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    const params = { article: article, category: category, price: price };
    // Estructura del nuevo producto...
    const newProduct = {
        article: article, // Dato obligatorio *
        category: category, // Dato obligatorio *
        client: client, // Dato obligatorio *
        color: (color) ? color : "", // Dato requerido
        commission: await getCommission(params), // Valor incrustado por código
        createdAt: (date) ? new Date(date) : new Date(), // Fecha opcional o incrustada por código
        details: (details) ? details : "", // Dato requerido
        price: (price) ? price : 0, // Dato requerido
        priority: "normal", // Valor por defecto incrustado por código
        size: (size) ? size : "", // Dato requerido
        status: (status) ? status : "pendiente", // Valor opcional o por defecto incrustado por código
        store: store // Dato obligatorio *
    }
    const createdProduct = await models.createProduct(newProduct);
    const msg = `Nuevo producto creado con éxito`;
    console.log(createdProduct);
    console.log(`Mensaje: ${msg}`);;
    res.status(200).json({ 'Mensaje': msg, 'Producto': createdProduct });
};

const replaceProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = {...req.body, status: 'pendiente', createdAt: new Date().toISOString()};
    const { article, category, client, price, store } = updatedProduct;
    let errormsg = `Error desconocido`;
    if (!client || !isNaN(client) || client.length !== 4) {
        errormsg = `El id de cliente indicado como parámetro no es válido`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if (!article || !category || !price || !store) {
        errormsg = `Faltan datos requeridos para reemplazar el producto`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    const params = { article: article, category: category, price: price };
    updatedProduct.commision = await getCommission(params); // Buscar y guardar la comisión por el producto
    const result = await models.replaceProduct(id, updatedProduct); // Reemplazar los datos del producto
    if (result && result != 403) {
        console.log(`Mensaje:  Los datos del producto con id ${id} fueron reemplazados con éxito`);
        res.status(200).json({'Mensaje': `Los datos del producto con id ${id} fueron reemplazados con éxito`, 'Producto': result});
    } else if (result == 403) {
        errormsg = `El estado actual del producto no permite reemplazar los datos del registro`;
        console.log(`Error: ${errormsg}`);
        res.status(403).json({'Error 403': errormsg});
    } else {
        errormsg = `No se encontró el producto con id ${id}`;
        console.log(`Error: ${errormsg}`);
        res.status(404).json({'Error 404': errormsg});
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    const { client, status } = updatedProduct;
    let errormsg = `Error desconocido`;
    if (client && (!isNaN(client) || client.length !== 4)) {
        errormsg = `El id de cliente indicado como parámetro no es válido para actualizar`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    if (status && status !== 'pendiente' && status !== 'cancelado' && status !== 'reservado' && status !== 'comprado' && status != 'recibido') {
        errormsg = `El estado indicado como parámetro no es válido para actualizar`;
        console.log(`Error: ${errormsg}`);
        return res.status(400).json({'Error 400': errormsg});
    }
    const result = await models.updateProduct(id, updatedProduct);
    if (result) {
        console.log(`Mensaje: Producto con id "${id}" actualizado con éxito`);
        res.status(200).json({'Mensaje': `Producto con id ${id} actualizado con éxito`, 'Producto': result});
    } else {
        errormsg = `No se encontró el producto con id ${id}`;
        console.log(`Error: ${errormsg}`);
        res.status(404).json({'Error 404': errormsg});
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    let errormsg = `Error desconocido`;
    try {
        const product = await models.getProductById(id);
        if (!product) {
            errormsg = `No se encontró el producto con id ${id}`;
            console.log(`Error: ${errormsg}`);
            return res.status(404).json({'Error 404': errormsg});
        }
        const result = await models.deleteProduct(id);
        if (result == 403) {
            errormsg = `El estado actual del producto no permite la eliminación del registro`;
            console.log(`Error: ${errormsg}`);
            res.status(403).json({'Error 403': errormsg});
        } else {
            console.log(`Mensaje: Se eliminó el producto con id ${id}`);
            res.status(200).json({'Mensaje': `Se eliminó el producto con id ${id}`});
        }
    } catch (error) {
        errormsg = `Error interno del servidor al intentar eliminar el producto con id ${id}`;
        console.error(`${errormsg}:`, error);
        res.status(500).json({'Error 500': errormsg});
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