/* ESTRUCTURA DE DATOS DEL PRODUCTO
El producto debe tener la siguiente estructura:
    {
        "id": 1,                                // Autonumérico
        "store": "Tienda 1",                    // String
        "name": "Producto 1",                   // String
        "color": "Rojo",                        // String
        "size": "M",                            // String
        "details": "Detalles del producto 1",   // String
        "price": 100,                           // Número
        "category": "Categoría 1",              // String
        "status": "pendiente",                  // String
        "createdAt": "2023-10-01T12:00:00Z"     // Fecha y hora
    }
*/
//--------------------Funciones para la base de datos ubicada en archivo JSON local--------------------
/*
import products from '../../jsondata/products.js';

const getAllProducts = () => {
    return products();
};

const getProductById = (id) => {
    console.log(`Buscando producto con ID: ${id}`);
    const product = products().find((item) => item.id == id);
    console.log(product);
    return product;
};

const postProduct = (newProduct) => {
    console.log('Nuevo producto recibido:', newProduct);
    return newProduct; // Simulando que se devuelve el producto creado
};
*/
//----------------Funciones para la base de datos ubicada en base de datos de Firestore-----------

import { db } from '../data/firebase.data.js';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

const getAllProducts = async () => {
    console.log('Buscando todos los productos');
    try {
        const snapshot = await getDocs(productsCollection);
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productsList;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

const getProductById = async (id) => {
    console.log(`Buscando producto con ID: ${id}`);
    try {
        const snapshot = await getDocs(productsCollection);
        const productDoc = snapshot.docs.find(doc => doc.id == id);
        if (!productDoc) {
            return null;
        }
        const product = { id: productDoc.id, ...productDoc.data() };
        return product;
    } catch (error) {
        console.error('Error al buscar producto por ID:', error);
        throw error;
    }
};

const createProduct = async (newProduct) => {
    console.log('Nuevo producto recibido:', newProduct);
    try {
        const newDoc = await addDoc(productsCollection, newProduct);
        console.log('Producto creado con ID:', newDoc.id);
        return { id: newDoc.id, ...newProduct };
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
}

export {
    getAllProducts,
    getProductById,
    createProduct
}