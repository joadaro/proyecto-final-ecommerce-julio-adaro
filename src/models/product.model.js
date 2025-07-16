/* ESTRUCTURA DE DATOS DEL PRODUCTO
El producto debe tener la siguiente estructura:
    {
        "id": "8GcQtrHKoCKb5UL45sni", // ID único del producto
        "store": "pies a la moda", // Nombre de la tienda
        "category": "calzado", // Categoría del producto
        "commision": 5000, // Comisión por venta
        "article": "campus importadas", // Nombre del artículo
        "price": 30000, // Precio del producto
        "idClient": "dory", // ID del cliente (4 letras)
        "size": "36", // Talle del producto
        "status": "pendiente", // Estado del producto (pendiente, reservado, cancelado, comprado, recibido)
        "createdAt": "2025-04-08T15:07:14.976Z", // Fecha de creación del producto
        "details": "", // Detalles adicionales del producto
        "color": "negro/rosa" // Color del producto
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
    try {
        const snapshot = await getDocs(productsCollection);
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productsList;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

const searchProducts = async (searchParams) => {
    console.log('Buscando productos con parámetros:', searchParams);
    try {
        const snapshot = await getDocs(productsCollection);
        const filteredProducts = snapshot.docs.filter(doc => {
            const data = doc.data();
            return Object.keys(searchParams).every(key => {
                return data[key] && data[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
            });
        }).map(doc => ({ id: doc.id, ...doc.data() }));
        return filteredProducts;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const snapshot = await getDocs(productsCollection);
        const productDoc = snapshot.docs.find(doc => doc.id == id);
        if (!productDoc) {
            return null;
        }
        const product = { id: productDoc.id, ...productDoc.data() };
        return product;
    } catch (error) {
        console.error(`Error al buscar producto con id "${id}:`, error);
        throw error;
    }
};

const createProduct = async (newProduct) => {
    try {
        const newDoc = await addDoc(productsCollection, newProduct);
        console.log({ id: newDoc.id, ...newProduct });
        console.log('Mensaje: Producto creado exitosamente');
        return { id: newDoc.id, ...newProduct };
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
}

const replaceProduct = async (id, updatedProduct) => {
    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        const actualStatus = snapshot.data().status;
        if (actualStatus !== 'pendiente' && actualStatus !== 'cancelado') {
            console.log('Mensaje: El estado actual del producto no permite el reemplazo del registro')
            return 403;
        }
        await updateDoc(productRef, {...updatedProduct});
        console.log(`Mensaje: Producto con id '${id}' actualizado exitosamente`);
        return { id, ...updatedProduct };
    } catch (error) {
        console.error(`Error al actualizar producto con id "${id}":`, error);
        throw error;
    }
};

const updateProduct = async (id, updatedFields) => {
    try {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, updatedFields);
        console.log(`Mensaje: Producto con id "${id}" actualizado exitosamente`);
        return { id, ...updatedFields };
    } catch (error) {
        console.error(`Mensaje: Error al actualizar producto con id "${id}":`, error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const productRef = doc(db, 'products', id);
        await deleteDoc(productRef);
        console.log(`Mensaje: Producto con id '${id}' eliminado exitosamente`);
    } catch (error) {
        console.error(`Error al eliminar producto con id "${id}":`, error);
        throw error;
    }
};

export {
    getAllProducts,
    searchProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}