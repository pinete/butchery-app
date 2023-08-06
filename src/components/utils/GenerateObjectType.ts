// Definimos una interfaz genérica para representar el tipo de un objeto
interface ObjectType<T> {
  [key: string]: T;
}

/**
 * Función que genera y devuelve el tipo de un objeto dado
 * @param obj 
 * @returns 
 */
function generateObjectType<T extends ObjectType<any>>(obj: T): T {
  return obj;
}

export default generateObjectType


