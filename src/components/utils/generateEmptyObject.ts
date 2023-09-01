/**
 * 
 * @param obj Devuelve la estructura con campos vacios del objeto dado
 * @returns 
 */
const generateEmptyObject = (obj: any): any => {
  let emptyObj: any = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      emptyObj[key] = generateEmptyObject(obj[key]);
    } else {
      switch (typeof obj[key]) {
        case 'string':
          emptyObj[key] = '';
          break;
        case 'boolean':
          emptyObj[key] = false;
          break;
        case 'number':
          emptyObj[key] = 0;
          break;
        default:
          emptyObj[key] = null;
      }
    }
  }

  return emptyObj;
}
export default generateEmptyObject