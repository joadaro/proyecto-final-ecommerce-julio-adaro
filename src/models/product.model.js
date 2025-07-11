/*
product = {
    "id": 1,
    "store": "Tienda 1",
    "name": "Producto 1",
    "color": "Rojo",
    "size": "M",
    "details": "Detalles del producto 1",
    "price": 100,
    "category": "Categoría 1"
}
*/

import products from '../../jsondata/products.js';

/*
const getAllProducts = () => {
    console.log('Buscando todos los productos');
    return products();
};
*/

// Asegúrate de que el siguiente archivo exista y exporte db correctamente
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
        const querySnapshot = await getDocs(productsCollection);
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(productsList);
        return productsList;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

const getProductById = (id) => {
    console.log(`Buscando producto con ID: ${id}`);
    const product = products().find((item) => item.id == id);
    console.log(product);
    return product;
};

export {
    getAllProducts,
    getProductById
}