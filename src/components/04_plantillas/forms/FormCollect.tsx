import { objFieldForm } from "./objFieldsForm";
import FormObj from "./FormObj";

type FamProps = {
  id:string,
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



const FormCollect = (collect:string, id:string, obj?:FamProps) => {
  // Obtengo la estructura del formulario según la coleccion
  const fields: FieldForm[] = objFieldForm(collect)
  return (
    <>
      {FormObj(
        id, 
        collect, 
        fields, 
        'Guardar' 
      )}
      {/* <FormObj id={id} collect={'families'} fields={fields} textButton='Guardar' /> */}
    </>

  )
}

export default FormCollect