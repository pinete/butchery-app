import TableObj from './TableObj';

// const objExample = [
//   {nombre:'Juan', apellido1:'Perez'},
//   {nombre:'Antonio', apellido1:'Marquez'},
//   {nombre:'José', apellido1:'Lopez'},
//   {nombre:'Julian', apellido1:'Gonzalez'},
// ]
const fields = ['article']
export default {
  title:'Prueba/ModalObj',
  component: TableObj
}

export const ModalObjExample = () => TableObj('article','Cancelar','Articulos', fields)