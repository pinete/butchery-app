import React, {useState} from "react";
import useSweetAlert from '../../../hooks/useSweetAlert'
import {SiAddthis as AddIcon} from 'react-icons/si'
import generateEmptyObject from "../../utils/generateEmptyObject";
import ObjState from "../../../firebase/ObjState";
import GenericTable from "../../03_organismos/GenericTable";
import { deleteObject, updateObject, addObject } from "../../../firebase/ObjController";
import FormCollect from "../forms/FormCollect";
import MotionButton from "../../01_atomos/MotionButton";

type TableCollectProps = {
  collect: string; 
  fieldsToShow?: string[];
  children?: React.ReactNode; // Prop para el contenido interno
};

/**
 * Muestra una tabla con los datos de la coleccion dada que se definen en el array fieldsToShow y los botones de acción de cabecera y lineas
 * @param  {string} collect  Nombre de la coleccion,
 * @param  {string[]} fieldsToShow  Array con los nombres de las propiedades del objeto a mostrar
 * @returns {JSX.Element} TableObj 
 */
const TableCollect = ({collect, fieldsToShow}: TableCollectProps):JSX.Element => {

  console.log('ha entrado en TableCollect')
  const Alert = useSweetAlert()
  // Obtenemos el objeto de la coleccion
  const {obj} = ObjState(collect)

  // Obtenemos el tipo de los items del array obj
  type ItemType = typeof obj[0];

  // Estado para controlar si se debe mostrar el formulario update
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);

  // Estado para almacenar los datos del formulario
  //const [formRow, setFormRow] = useState({});

  /*------------------------ ACCIONES EN BOTONES ------------------------- */
  const updAction = (row:ItemType) => {
    updateObject(row,collect)
    console.log('Has hecho onClick sobre el boton "Upd" de la linea con row = ', row)
  }
  const delAction = (row:ItemType) => {
    Alert.onDelete(()=>deleteObject(row, collect), collect)
    console.log(`Has hecho onClick sobre el boton 'Del' de la linea ${Object.values(row)[0]}`)
  }
  const newAction = (row:ItemType) => { 
    addObject(row, collect)
      .then((newId) => 
        {
          row = {...row, id:newId }
          console.log('Ahora Row es: ', row)
          updateObject(row, collect)
        }
      )
      .catch((error) => 
        console.log('Error: ', error)
      )
    console.log(`Has hecho onClick sobre el boton 'New' y row es ${JSON.stringify(row)}`)
  }
  
  // Escojemos la acción a realizar en función del botón activado
  /*
  const btnAction = (row :ItemType, clickedBtn?: 'Del' | 'Upd' | 'New') => {
    let btnClick
    if(!clickedBtn) btnClick=''; else btnClick=clickedBtn
    switch (btnClick) {
      case 'Upd':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable con row = ${JSON.stringify(row)}`)
        updAction(row);
        setOpenUpdateForm(false)
        break
      case 'Del':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable `)
        delAction(row);
        setOpenDeleteForm(false)
        break
      case 'New':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable con row = ${JSON.stringify(row)}`)
        newAction(row);
        setOpenNewForm(false)
        break
      default:  
        console.log(`Acción de boton no contemplada: Valor de btnClick=${btnClick}`)
    } 
  }
  */
 
  /*-------------------------- FIN ACCIONES EN BOTONES -------------------------- */

  // Definimos los botones de cabecera de la tabla
  const renderHeadButtons= ():JSX.Element | undefined => {
    // Generamos row con la estructura pero con datos vacíos
    const emptyRow:ItemType = generateEmptyObject(obj[0])
    return (  
      <div className="inline-flex">
        {/* Boton Add con formulario modal*/}
        {(Object.keys(emptyRow).length > 0) && 
          <FormCollect 
            modal={true} 
            withOpenBtn={true} 
            openForm={openNewForm}
            setOpenForm={setOpenNewForm}
            btnModalIcon= 'Add' 
            collect={collect} 
            row={emptyRow} 
            actionOnSubmit = {newAction} 
            //actionOnSubmit = {()=>btnAction(emptyRow,'New')}
            textSubmitButton = "Añadir"
          /> 
        }
      </div>
    )
  };

  // Definimos los botones al final de cada linea de la tabla
  const renderLineButtons = (row:ItemType) => {
    return (
    <div className="inline-flex">
      {/* Boton Delete */}
      <MotionButton 
        textButton="Eliminar" 
        icon='Trash' 
        bg="red-500" 
        bgHover="red-800" 
        //onclick={() => btnAction(row,'Del')}
        onclick = {()=>delAction(row)}
      />
      {/* Boton Update con formulario modal*/}
      {(Object.keys(row).length > 0) && 
        <FormCollect 
          modal={true} 
          withOpenBtn={true} 
          openForm={openUpdateForm}
          setOpenForm={setOpenUpdateForm}
          btnModalIcon= 'Pencil' 
          collect={collect} 
          row={row} 
          actionOnSubmit = {updAction} 
          //actionOnSubmit = {()=>btnAction(row,'Upd')}
          textSubmitButton="Guardar cambios"
        /> 
      }  
    </div>
    )
  };

  return (
    <div className="mt-28 max-h-screen">
      {obj.length > 0 && <GenericTable 
        data = {obj} 
        //btnAction = {btnAction}
        fieldsToShow = {fieldsToShow} 
        renderHeadButtons = {renderHeadButtons}
        renderLineButtons = {renderLineButtons}
      />}
      {obj.length <= 0 && <h2>Sin datos</h2>}
    </div>
  )
}

export default TableCollect