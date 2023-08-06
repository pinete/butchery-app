import ObjFieldForm from "./objFieldsForm";
import { updateObject } from "../../../firebase/ObjController";
import { useState} from "react";
import GenericFormFormik from "./GenericFormFormik";

type Props = {
  modal:boolean,
  collect:string,
  row:{},
  textSubmitButton:string,
}
// Propiedades del boton submit
export const buttonProps:MotionButtonProps = { 
  textColorHover:'white',
  bg:'sky-300',
  bgHover:'sky-400',
  bgDark:'sky-600',
  bgHoverDark:'sky-800',
  adjunctClass:'',
}

// Propiedades del input
export const inputProps:MotionInputProps = { 
  bg:'sky-100',
  bgHover:'sky-400',
  bgDark: 'slate-700',
  bgHoverDark:'sky-800',
  textColorHover:'white',
  adjunctClass: '',
  placeholder:'Placeholder de input' 
}

// Propiedades de textArea
export const areaProps:MotionTextAreaProps = { 
  cols:40,
  rows:3,
  bg:'sky-100',
  bgHover:'sky-400',
  bgDark: 'slate-700',
  bgHoverDark:'sky-800',
  textColorHover:'white',
  adjunctClass: '',
  placeholder:'Placeholder de textarea' 
}

// cadenas de className Tailwind
export const inputClass = 
  `
    inputTailWind 
    bg-${inputProps?.bg} 
    hover:bg-${inputProps?.bgHover} 
    dark:bg-${inputProps?.bgDark} 
    dark:hover:bg-${inputProps?.bgHoverDark}  
    dark:text-${inputProps?.textColorHover}-200 
    dark:placeholder:text-${inputProps?.textColorHover}-300 
    ${inputProps?.adjunctClass}
  `
export const areaClass = 
  `
    inputTailWind 
    bg-${areaProps?.bg} 
    hover:bg-${areaProps?.bgHover} 
    dark:bg-${areaProps?.bgDark} 
    dark:hover:bg-${areaProps?.bgHoverDark}  
    dark:text-${areaProps?.textColorHover}-200 
    dark:placeholder:text-${areaProps?.textColorHover}-300 
    ${areaProps?.adjunctClass}
  `
export const buttonClass = 
  `
    inputTailWind 
    bg-${buttonProps?.bg} 
    hover:bg-${buttonProps?.bgHover} 
    dark:bg-${buttonProps?.bgDark} 
    dark:hover:bg-${buttonProps?.bgHoverDark}  
    dark:text-${buttonProps?.textColorHover}-200 
    dark:placeholder:text-${buttonProps?.textColorHover}-300 
    ${buttonProps?.adjunctClass}
  `
  
const FormCollect = ({ modal, collect, row, textSubmitButton }:Props):JSX.Element => {
  console.log('ha entrado en FormCollect' )
  // Obtengo la estructura del formulario según la coleccion
  const fields:FieldForm[] = ObjFieldForm (collect)

  // Eliminamos la propiedad 'pos' que no existe en la DB
  if ('pos' in row) delete row['pos'] 

  // Asignamos row al estado de formItem
  const[formItem, setFormItem] = useState<typeof row>(row)

  // *************** POR SI SE NECESITA LA ID MAS ADELANTE ******************
  // Capturamos el id del objeto
  // const entries = Object.entries(row); 
  // let id:string=''
  // entries.forEach((item) => {
  //   if (item.length > 1 && item[0] === 'id') {id = JSON.stringify(item[1])}
  // })
  // *************************************************************************

  // Accion a realizar al guardar(onSubmit)
  const updObj = (row:{}) => {
    //alert ('Se ejecuta UpdObj en FormObj.tsx')
    updateObject(row, collect)
  }
  
  return ( 

      <GenericFormFormik 
        collect = {collect}
        modal = {modal}
        title = {collect}
        formItem = {formItem}
        setFormItem = {setFormItem}
        fields = {fields}
        //buttonClass = {buttonClass}
        //inputClass = {inputClass}
        //areaClass = {areaClass}
        textSubmitButton = {textSubmitButton}
        onSubmit = {updObj}
      />

  )  
}

export default FormCollect