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

const listCommissions = async () => {
    // Esta función devuelve una lista de todas las comisiones
}

const getCommission = async (params) => {
    // Esta función devuelve una comisión específica basada en los parámetros proporcionados o un valor 0 por defecto
}

const getAllCommissions = async () => {
    try {
        const snapshot = await getDocs(commissionsCollection);
        const commissionsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`Se encontraron ${commissionsList.length} comisiones`);
        return commissionsList;
    } catch (error) {
        console.error('Error al obtener comisiones:', error);
        throw error;
    }
}

const searchCommission = async (searchParams) => {
    console.log('Buscando comisiones con parámetros:', searchParams);
    const { article, category, price } = searchParams;
    try {
        const snapshot = await getDocs(commissionsCollection);
        const filteredCommissions = snapshot.docs.filter(doc => {
            const data = doc.data();
            return Object.keys(searchParams).every(key => {
                return data[key] && data[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
            });
        }).map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`Se encontraron ${filteredCommissions.length} comisiones que coinciden con los criterios de búsqueda`);
        return filteredCommissions;
    } catch (error) {
        console.error('Error al buscar comisiones:', error);
        throw error;
    }
}

export {
    getAllCommissions,
    searchCommission
}