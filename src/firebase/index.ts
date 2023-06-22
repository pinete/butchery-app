// Import the functions you need from the SDKs you need
import { dblClick } from "@testing-library/user-event/dist/click";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration (produccion)
// NOTA: La misma por ahora. Para produccion cambiar la constante firebaseConfig
const firebaseConfig = {
    apiKey: "AIzaSyCCqp6u4LCkVQU420V-I_hBOW6CTy0a-yE",
    authDomain: "butchery-app.firebaseapp.com",
    projectId: "butchery-app",
    storageBucket: "butchery-app.appspot.com",
    messagingSenderId: "79803408142",
    appId: "1:79803408142:web:124db859e685639cd4815f"
};
// Your web app's Firebase configuration (desarrollo o test)

const developmentFirebaseConfig = {
  apiKey: "AIzaSyCCqp6u4LCkVQU420V-I_hBOW6CTy0a-yE",
  authDomain: "butchery-app.firebaseapp.com",
  projectId: "butchery-app",
  storageBucket: "butchery-app.appspot.com",
  messagingSenderId: "79803408142",
  appId: "1:79803408142:web:124db859e685639cd4815f"
};

// Initialize Firebase
// Si estamos en desarrollo o en test debe utilizarse la configuracion 'developmentFirebaseConfig'
// Si estamos en produccion debe utilizar 'firebaseConfig'
let app
if (process.env.NODE_ENV === 'production') {
  app = initializeApp(firebaseConfig);
} else {
  app = initializeApp(developmentFirebaseConfig);
}
// Inicializar DB Firestore

const db = getFirestore()

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

export { 
  app, 
  db, 
  storage,
}
