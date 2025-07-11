/*
user = {
    "id": 1,
    "name": 'Julio Oscar',
    "surname": 'Adaro',
    "email": 'julio.adaro@example.com',
    "username": 'julio.adaro',
    "password": 'securepassword123',
    "role": 'admin',
    "signInAt": '2023-01-01T00:00:00Z'
}
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

const getAllUsers = async () => {

}

const getUser = async () => {

}

export {
    getAllUsers,
    getUser
};