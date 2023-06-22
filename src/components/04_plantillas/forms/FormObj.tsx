import GenericTailWindForm from "../../03_organismos/GenericTailWindForm" 
import {getSimplifiedObjectById} from "../../../firebase/ObjController"
import useList from "../../../hooks/useList";

const FormObj = (
  id:string, 
  collect:string,
  fields:FieldForm[],
  textButton:string='Submit', 

  
  //renderHeadButtons?:()=>React.ReactNode,
  //renderLineButtons?:()=>React.ReactNode,
) => {

// Propiedades del boton submit
const buttonProps:MotionButtonProps = { 
  textButton,
  textColorHover:'white',
  bg:'sky-300',
  bgHover:'sky-400',
  bgDark:'sky-600',
  bgHoverDark:'sky-800',
  adjunctClass:'',
  // onsubmit?: (data:T)=>void
  //onclick:()=>{}

}
const inputProps:MotionInputProps = { 
  bg:'sky-100',
  bgHover:'sky-400',
  bgDark: 'slate-700',
  bgHoverDark:'sky-800',
  textColorHover:'white',
  adjunctClass: '',
  placeholder:'Placeholder de input' 
}
const areaProps:MotionTextAreaProps = { 
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

  // Generamos la lista con un único registro que corresponde al de la coleccion con el id dado
  const formList = useList(async () => await getSimplifiedObjectById(collect, id))

  //console.log('formList en FormObj es: ',formList)
 
  return (
 
            <GenericTailWindForm 
              // data={obj} 
              formList={formList}
              fields = {fields}
              buttonProps = {buttonProps}
              inputProps = {inputProps}
              areaProps = {areaProps}
              
              //renderHeadButtons = {renderHeadButtons}
              //renderLineButtons = {renderLineButtons}
            />

  )
}
export default FormObj