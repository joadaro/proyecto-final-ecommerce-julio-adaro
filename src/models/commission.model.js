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

const commissionsCollection = collection(db, 'commissions');

const getAllCommissions = async () => {
    try {
        const snapshot = await getDocs(commissionsCollection);
        const commissionsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return commissionsList;
    } catch (error) {
        console.error('Error al obtener comisiones:', error);
        throw error;
    }
}

const searchCommission = async (searchParams) => {
    try {
        const snapshot = await getDocs(commissionsCollection);
        const filteredCommissions = snapshot.docs.filter(doc => {
            const data = doc.data();
            return Object.keys(searchParams).every(key => {
                return data[key] && data[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
            });
        }).map(doc => ({ id: doc.id, ...doc.data() }));
        return filteredCommissions;
    } catch (error) {
        console.error('Error al buscar comisiones:', error);
        throw error;
    }
}

const getCommissionById = async (id) => {
    try {
        const snapshot = await getDocs(commissionsCollection);
        const commDoc = snapshot.docs.find(doc => doc.id == id);
        if (!commDoc) { return null }
        const comm = { id: commDoc.id, ...commDoc.data() };
        return comm;
    } catch (error) {
        console.log(`Error al buscar comisión con id ${id}`, error);
        throw error;
    }
}

const createCommission = async (newCommission) => {
    try {
        const newDoc = await addDoc(commissionsCollection, newCommission);
        return { id: newDoc.id, ...newCommission };
    } catch (error) {
        console.error('Error al crear la nueva comisión:', error);
        return res.status(500).json({ error: 'Error al crear comisión' });
    }
}

const updateCommission = async (id, updatedFields) => {
    try {
        const comRef = doc(db, 'commissions', id);
        await updateDoc(comRef, updatedFields);
        return {id, ...updatedFields};
    } catch (error) {
        console.error(`Mensaje: Error al actualizar comisión con id ${id}:`, error);
        throw error;
    }
}

const deleteCommission = async (id) => {
    try {
        const commRef = doc(db, 'commissions', id);
        await deleteDoc(commRef);
        return 200;
    } catch (error) {
        console.error(`Error al eliminar comisión con id ${id}:`, error);
        throw error;
    }
}

export {
    getAllCommissions,
    searchCommission,
    getCommissionById,
    createCommission,
    updateCommission,
    deleteCommission
}