import { useMemo, useState } from "react";
import { getSimplifiedObjects } from "../../../firebase/ObjController";



const ObjFieldForm = (collect:string) => {
  const [data, setData] = useState([{}])
  const [data2, setData2] = useState([{}])
  let fields: FieldForm[] = []

  // Para el caso de los tipo Select
  useMemo(() => {
    const selectList = async (c: string) => {
      const result = await getSimplifiedObjects(c);
      setData(result);
    };
    if (collect === "subfamilies") selectList("families");
    if (collect === "articles") {
      selectList("families");
      getSimplifiedObjects('subfamilies')
      .then (response => setData2(response))
    }
  }, [collect]);

  //alert(`data = ${JSON.stringify(data)}`)

  switch (collect) {
    case 'families':
      fields = [
        { key: 'nombre', type: 'text', label:'Nombre' },// nombre
        { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true },// imagen
      ];
      break;
    case 'subfamilies':
      fields = [
        { key: 'id', type: 'hidden', label:'' }, // id
        { key: 'idFam', type:'select', label:'Familia', options: data},
        { key: 'nombre', type: 'text', label:'Nombre'}, // nombre
        { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true }, // imagen
      ];
      break;
    case 'articles':

      fields = [
        { key: 'id', type: 'hidden', label:'' }, // id
        { key: 'idFam', type:'select', label:'Familia', options: data},
        { key: 'idSubFam', type:'select', label:'Subfamilia', options: data2},
        { key: 'nombre', type: 'text', label:'Articulo'}, // nombre
        { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true }, // imagen
      ];
      break;
    default:
      fields = [{ key: '', type: 'text', label:'Undefined'}]
      alert(`La coleccion '${collect}' no esta definida en objFieldForm.ts`)
      break;
  }
  return fields;
}

export default ObjFieldForm