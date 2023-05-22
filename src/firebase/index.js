// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration (produccion)
const firebaseConfig = {
    apiKey: "AIzaSyCCqp6u4LCkVQU420V-I_hBOW6CTy0a-yE",
    authDomain: "butchery-app.firebaseapp.com",
    projectId: "butchery-app",
    storageBucket: "butchery-app.appspot.com",
    messagingSenderId: "79803408142",
    appId: "1:79803408142:web:124db859e685639cd4815f"
};
// Your web app's Firebase configuration (desarrollo o test)
// NOTA: La misma por ahora
const developmentFirebaseConfig = {
  apiKey: "AIzaSyCCqp6u4LCkVQU420V-I_hBOW6CTy0a-yE",
    authDomain: "butchery-app.firebaseapp.com",
    projectId: "butchery-app",
    storageBucket: "butchery-app.appspot.com",
    messagingSenderId: "79803408142",
    appId: "1:79803408142:web:124db859e685639cd4815f"
};

// Initialize Firebase
// Si estamos en desarrollo o en test debe utilizae la configuracion 'developmentFirebaseConfig'
// Si estamos en produccion debe utilizar 'firebaseConfig'
let app;
if (process.env.NODE_ENV === 'production') {
  app = initializeApp(firebaseConfig);
} else {
  app = initializeApp(developmentFirebaseConfig);
}
// Inicializar DB Firestore
const db = getFirestore()

export { 
  app, 
  db 
}
