import FormObj from "./FormObj";

type FamProps = {
  idFam:string,
  nombre:string,
  img?:string
}

// const handleButtonDeleteClick = () => {
//   alert('Ha pulsado el botón Del');
// };

// const handleButtonUpdateClick = () => {
//   const message='Has pulsado el boton Update'
//   return alert(message)
// }

// const handleButtonAddLineClick= () => {
//   const message='Has pulsado el boton de la cabecera de la tabla'
//   return alert(message)
// }



const fields: FieldForm[] = [
  { key: 'nombre', type: 'text', label:'Nombre', isArea: false},// nombre
  { key: 'img', type: 'imageFile', label:'Imagen', readOnly: true, isArea: false},// imagen
];

const FormFam = (id:string, obj?:FamProps) => {
  
  return (
    <>
      {FormObj(
        id, 
        'families', 
        fields, 
        'Guardar' 
      )}
      {/* <FormObj id={id} collect={'families'} fields={fields} textButton='Guardar' /> */}
    </>

  )
}

export default FormFam