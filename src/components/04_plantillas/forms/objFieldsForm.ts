import { useState } from "react";
import { getSimplifiedObjects } from "../../../firebase/ObjController";


export const objFieldForm = (collect:string) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([{}])
  let fields: FieldForm[] = []

  
  switch (collect) {
    case 'families':
      fields = [
        { key: 'nombre', type: 'text', label:'Nombre'},// nombre
        { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true },// imagen
      ];
      break;
    case 'subfamilies':
      const selectFamiliesList = async () => {
        setData(await getSimplifiedObjects('families'))
      }
      selectFamiliesList()
      fields = [
        //{ key: 'idFam', type:'text', label:'Familia'},
        { key: 'idFam', type:'select', label:'Familia', options: data},
        { key: 'nombre', type: 'text', label:'Nombre'}, // nombre
        { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true }, // imagen
      ];
      break;
    default:
      alert(`La coleccion '${collect}' no esta definida en objFieldForm.ts`)
      break;
  }

  return fields
}