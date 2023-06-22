import { 
  addDoc, 
  getDocs, 
  collection, 
  setDoc, 
  doc, 
  deleteDoc, 
  getDoc, 
} from 'firebase/firestore'
import {  db } from './index'

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
export const getSimplifiedObjectById = async (collect, id) => {
  //const [objeto, setObjeto] = useState<Objeto | null>(null);
  //const [objeto, setObjeto] = useState(null);
  
  const arrayResultante = [];
  const objetoSimplificado = {}
  
  const docRef = doc(db, collect, id);
  const docSnap = await getDoc(docRef)
  //const doc = await coleccion.doc(id).get();
  const propiedades = docSnap.data();
      if (docSnap.exists) {
        //const objetoRecuperado = doc.data()// as Objeto;

        for (const propiedad in propiedades) {
          if (propiedades.hasOwnProperty(propiedad) && typeof propiedades[propiedad] !== 'object') {
            objetoSimplificado[propiedad] = propiedades[propiedad];
          }
        }
        arrayResultante.push(objetoSimplificado)
        //console.log('objetoRecuperado: ',objeto)
        console.log('objetoRecuperado: ',arrayResultante)
      } else {
        console.log('El documento no existe.');
      }

  //return objeto
  return arrayResultante
  }

/**
 * Función para devolver querySnapshot como un array de objetos simplificado  
 * @param {string} collect Colección a leer
 * @returns Object
 * */ 
export const getSimplifiedObjects = async (collect) => {
  const arrayResultante = [];
  //const querySnapshot = await getDocs(collection(db, collect), orderBy('timestamp'));
  const querySnapshot = await getDocs(collection(db, collect));
  const documentos = querySnapshot.docs;
  // Iterar sobre los documentos del querySnapshot
  for (let i = 0; i < documentos.length; i++) {
    const doc = documentos[i];

    // Extraer las propiedades del documento
    const propiedades = doc.data();

    // Crear un nuevo objeto simplificado con las propiedades deseadas
    const objetoSimplificado = { pos: (i + 1)};
    //const objId = { pos: (i + 1)}
    for (const propiedad in propiedades) {
      if (propiedades.hasOwnProperty(propiedad) && typeof propiedades[propiedad] !== 'object') {
        objetoSimplificado[propiedad] = propiedades[propiedad];
      }
    }

    // Agregar el objeto al array resultante
    arrayResultante.push(objetoSimplificado);
  }

  return arrayResultante;
}

/**
 * SOLO PARA PROPIEDADES BOOLEANAS. Cambia el estado de la propiedad a su contrario
 * @param {object} obj Objeto a cambiar
 * @param {string} key Nombre de la propiedad a cambiar
 * @param {string} collect Colección en la base de datos
 * @returns action delete
 */
export const toggleObjectKey = (obj, field, collect) => {
  const updatedObj = { ...obj };
  updatedObj[field] = !obj[field];
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






