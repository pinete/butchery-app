import React from "react";
//import ObjState from "../../../../firebase/ObjState";
import GenericTailWindForm  from "../../../03_organismos/GenericTailWindForm";
import ModalComponent from "../ModalComponent";
import useObject from "../../../../hooks/useObject";
import ObjState from "../../../../firebase/ObjState";

/*
const buttonProps:MotionButtonProps = { 
  textButton:'Aceptar',
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

*/ 

const ModalObjForm = (
  fields:FieldForm[],
  collect:string, 
  textButton:string='',
  title?:string, 
  arrayFields?:string[],
  //renderHeadButtons?:()=>React.ReactNode,
  //renderLineButtons?:()=>React.ReactNode,
):JSX.Element => {
    //let {obj} = ObjState(collect)
    //const obj = useObject(collect,ObjState(collect))

    //const [open, setOpen] = React.useState(false);
    //const handleOpen = () => setOpen((cur) => !cur);

    const ComponenteGenerico:JSX.Element = 
      <GenericTailWindForm 
          //data={obj}
          fields={fields}
          //buttonProps={buttonProps} 
          //inputProps={inputProps}})
        
      /> 
        
    return (
      <ModalComponent key='component'
        children = {ComponenteGenerico}
      />
    )
  }
export default ModalObjForm
