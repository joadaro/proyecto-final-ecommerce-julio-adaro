// Importa las funciones que necesitas de los SDKs que necesitas
// Cargar las variables de entorno desde el archivo .env
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // No funciona en el entorno de Node.js
// TODO: Agrega SDKs para los productos de Firebase que deseas utilizar
// https://firebase.google.com/docs/web/setup#available-libraries

// Tu configuración de Firebase para la Web
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};
// Para Firebase JS SDK v7.20.0 y versiones posteriores (measurementId es opcional)

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // No funciona en el entorno de Node.js

// Inicializar Firestore
const db = getFirestore(app);
export { db };