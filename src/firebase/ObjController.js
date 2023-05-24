import { addDoc, getDocs, collection, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from './index'

/**
 * Guarda un nuevo objeto en la colección dada en la base de datos
 * @param {object} obj Objeto a guardar
 * @param {string} collect Colección donde guardar
 * @returns id del objeto en la coleccion
 */
export const addObject = async (obj, collect) => {
  const docRef = await addDoc(collection(db, collect), obj)
  return docRef.id;
}

/**
 * Lee todos los objetos de la coleccion de la base de datos
 * @param {string} collect Colección a leer
 * @returns Object
 */
export const getObjects = async (collect) => {
  const querySnapshot = await getDocs(collection(db, collect));
  const object = querySnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } 
  })
  return object
}

/**
 * SOLO PARA PROPIEDADES BOOLEANAS. Cambia el estado de la propiedad a su contrario
 * @param {object} obj Objeto a cambiar
 * @param {string} key Nombre de la propiedad a cambiar
 * @param {string} collect Colección en la base de datos
 * @returns action delete
 */
export const toggleObjectKey = (obj, key, collect) => {
  const updatedObj = { ...obj };
  updatedObj[key] = !obj[key];
  return setDoc(doc(db, collect, obj.id), updatedObj);
}

/**
 * Cambia la propiedad del objeto a un nuevo valor
 * @param {object} obj Objeto a cambiar
 * @param {string} key Nombre de la propiedad a cambiar
 * @param {*} newValue Nuevo valor que debe tener la propiedad
 * @param {string} collect Colección en la base de datos
 * @returns 
 */
export const updateObjectKey = (obj, key, newValue, collect) => {
  const updatedObj = { ...obj };
  updatedObj[key] = newValue
  return setDoc(doc(db, collect, obj.id), updatedObj);
}

/**
 * Actualiza el Item (objeto) de la coleccion dada a los nuevos valores en la misma Id
 * @param {*} obj 
 * @param {*} collect 
 * @returns 
 */
export const updateObject = (obj, collect) => {
  return setDoc(doc(db, collect, obj.id), obj);
}

/**
 * Borra el objeto seleccionado
 * @param {object} obj objeto a borrar
 * @param {string} collect Coleccion en la base de datos
 */
export const deleteObject = async (obj, collect) => {
  await deleteDoc(doc(db, collect, obj.id));
}




