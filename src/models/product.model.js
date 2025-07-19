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
        if (!productDoc) { return null }
        const product = { id: productDoc.id, ...productDoc.data() };
        return product;
    } catch (error) {
        console.error(`Error al buscar producto con id ${id}:`, error);
        throw error;
    }
};

const createProduct = async (newProduct) => {
    try {
        const newDoc = await addDoc(productsCollection, newProduct);
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
        if (actualStatus !== 'pendiente' && actualStatus !== 'cancelado') { return 403 }
        await updateDoc(productRef, {...updatedProduct});
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
        return { id, ...updatedFields };
    } catch (error) {
        console.error(`Mensaje: Error al actualizar producto con id "${id}":`, error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        const actualStatus = snapshot.data().status;
        if (actualStatus == 'comprado' || actualStatus == 'recibido') { return 403 }
        await deleteDoc(productRef);
        return 200;
    } catch (error) {
        console.error(`Error al eliminar producto con id ${id}:`, error);
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