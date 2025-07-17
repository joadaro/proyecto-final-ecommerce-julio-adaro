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

const usersCollection = collection(db, 'users');

const getAllUsers = async () => {
    try {
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.map(doc => ({id: doc.id, ...doc.data() }));
        return usersList;
    } catch (error) {
        console.log('Error al obtener usuarios:', error);
        throw error;
    }
}

const getUser = async (email) => {
    try {
        const snapshot = await getDocs(usersCollection);
        const userDoc = snapshot.docs.find(doc => doc.data().email == email);
        if (!userDoc) { return null }
        const user = { id: userDoc.id, ...userDoc.data() };
        return user;
    } catch (error) {
        console.log('Error al intentar obtener el usuario:', error);
        throw error;
    }
}

export {
    getAllUsers,
    getUser
}