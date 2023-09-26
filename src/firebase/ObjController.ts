import {
  addDoc,
  getDocs,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  QueryDocumentSnapshot,
  QuerySnapshot, 
  query, 
  where,
  Query,
  orderBy
} from 'firebase/firestore';
import { db } from './index';

interface ObjectData {
  [key: string]: any;
}

/**
 * Guarda un nuevo objeto en la colección dada en la base de datos
 * @param {object} obj Objeto a guardar
 * @param {string} collect Colección donde guardar
 * @returns id del objeto en la coleccion
 */
export const addObject = async (obj: ObjectData, collect: string): Promise<string> => {
  const docRef = await addDoc(collection(db, collect), obj);
  return docRef.id;
};

/**
 * Lee todos los objetos de la coleccion de la base de datos
 * @param {string} collect Colección a leer
 * @returns Object
 */
export const getObjects = async (collect: string): Promise<ObjectData[]> => {
  const querySnapshot: QuerySnapshot = await getDocs(collection(db, collect));
  const objects: ObjectData[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
    return { ...doc.data(), id: doc.id };
  });
  return objects;
};

export const getSimplifiedObjectById = async (collect: string, id: string): Promise<ObjectData[]> => {
  const arrayResultante: ObjectData[] = [];
  const objetoSimplificado: ObjectData = {};
  const docRef = doc(db, collect, id);
  const docSnap = await getDoc(docRef);
  const propiedades = docSnap.data();

  if (docSnap.exists()) {
    for (const propiedad in propiedades) {
      if (propiedades.hasOwnProperty(propiedad) && typeof propiedades[propiedad] !== 'object') {
        objetoSimplificado[propiedad] = propiedades[propiedad];
      }
    }
    arrayResultante.push(objetoSimplificado);
    console.log('objetoRecuperado: ', arrayResultante);
  } else {
    console.log('El documento no existe.');
  }

  return arrayResultante;
};

/**
 * Función para devolver querySnapshot como un array de objetos simplificado
 * @param {string} collect Colección a leer
 * @returns Object
 */
export const getSimplifiedObjects = async (collect: string): Promise<ObjectData[]> => {
  const arrayResultante: ObjectData[] = [];
  const querySnapshot: QuerySnapshot = await getDocs(collection(db, collect));
  const documentos = querySnapshot.docs;

  for (let i = 0; i < documentos.length; i++) {
    const doc = documentos[i];
    const propiedades = doc.data();
    //const objetoSimplificado: ObjectData = { pos: i + 1 };
    const objetoSimplificado: ObjectData = {};

    for (const propiedad in propiedades) {
      if (propiedades.hasOwnProperty(propiedad) && typeof propiedades[propiedad] !== 'object') {
        objetoSimplificado[propiedad] = propiedades[propiedad];
      }
    }

    arrayResultante.push(objetoSimplificado);
  }
  return arrayResultante;
};
/**
 * Función para devolver querySnapshot como un array de objetos simplificado ordenado por la key guardada en field
 * @param {string} collect Colección a leer
 * @param {string} field Campo por el que ordenar
 * @returns Object
 */
export const getSimplifiedObjectsOrderBy = async (collect: string, field:string): Promise<ObjectData[]> => {
  const arrayResultante: ObjectData[] = [];

  try {
    const docRef = collection(db, collect);
    const q = query(docRef, orderBy(field));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      arrayResultante.push(doc.data());
    });
    return arrayResultante;

  } catch (error) {
    console.error('Error al obtener objetos ordenados:', error);
    throw error;
  }
};

/**
 * Función para devolver querySnapshot como un array de objetos simplificado donde un item es igual al valor dado
 * @param {string} collect Colección a leer
 * @param {string} field1 Nombre del campo por el que seleccionar
 * @param {string} value1 Valor que ha de coincidir en el campo
 * @returns Object
 */
export const getSimplifiedObjectsWhere = async (collect: string, field1:string, value1:any, field2?:string, value2?:any): Promise<ObjectData[]> => {
  const arrayResultante: ObjectData[] = [];
  
  const collectRef = collection(db, collect);
  // Creamos la consulta
  let q:Query
  if (field2) q = query(collectRef, where(field1, "==", value1), where(field2, "==", value2));
  else q = query(collectRef, where(field1, "==", value1))
  // Ejecutamos la consulta
  const querySnapshot = await getDocs(q);
  const documentos = querySnapshot.docs;
  console.log('Documentos en getSimplifiedObjectsWhere', documentos)
  // Simplificamos el objeto resultante
  for (let i = 0; i < documentos.length; i++) {
    const doc = documentos[i];
    const propiedades = doc.data();
    const objetoSimplificado: ObjectData = { pos: i + 1 };

    for (const propiedad in propiedades) {
      if (propiedades.hasOwnProperty(propiedad) && typeof propiedades[propiedad] !== 'object') {
        objetoSimplificado[propiedad] = propiedades[propiedad];
      }
    }
    
    arrayResultante.push(objetoSimplificado);
    console.log('arrayResultante en getSimplifiedObjectsWhere', arrayResultante)
  }
  return arrayResultante;
};

/**
 * SOLO PARA PROPIEDADES BOOLEANAS. Cambia el estado de la propiedad a su contrario
 * @param {object} obj Objeto a cambiar
 * @param {string} field Nombre de la propiedad a cambiar
 * @param {string} collect Colección en la base de datos
 * @returns action delete
 */
export const toggleObjectKey = (
  obj: ObjectData,
  field: string,
  collect: string
): Promise<void> => {
  const updatedObj: ObjectData = { ...obj };
  updatedObj[field] = !obj[field];
  return setDoc(doc(db, collect, obj.id), updatedObj);
};

/**
 * Cambia la propiedad del objeto a un nuevo valor
 * @param {object} obj Objeto a cambiar
 * @param {string} key Nombre de la propiedad a cambiar
 * @param {*} newValue Nuevo valor que debe tener la propiedad
 * @param {string} collect Colección en la base de datos
 * @returns
 */
export const updateObjectKey = (
  obj: ObjectData,
  key: string,
  newValue: any,
  collect: string
): Promise<void> => {
  const updatedObj: ObjectData = { ...obj };
  updatedObj[key] = newValue;
  return setDoc(doc(db, collect, obj.id), updatedObj);
};

/**
 * Actualiza el Item (objeto) de la coleccion dada a los nuevos valores en la misma Id
 * @param {*} obj
 * @param {*} collect
 * @returns
 */
export const updateObject = (obj: ObjectData, collect: string): Promise<void> => {
  return setDoc(doc(db, collect, obj.id), obj);
};

/**
 * Borra el objeto seleccionado
 * @param {object} obj objeto a borrar
 * @param {string} collect Coleccion en la base de datos
 */
export const deleteObject = async (obj: ObjectData, collect: string): Promise<void> => {
  await deleteDoc(doc(db, collect, obj.id));
};