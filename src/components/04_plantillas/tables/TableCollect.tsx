import React, {useState} from "react";
import {SiAddthis as AddIcon} from 'react-icons/si'
import ObjState from "../../../firebase/ObjState";
import GenericTable from "../../03_organismos/GenericTable";
import { deleteObject } from "../../../firebase/ObjController";
import FormCollect from "../forms/FormCollect";

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
  // Obtenemos el objeto de la coleccion
  const {obj} = ObjState(collect)
  // Obtenemos el tipo de los items del array obj
  //setObj(generateObjectType(obj))
  type ItemType = typeof obj[0];

  // Estado para controlar si se debe mostrar el formulario
  const [showForm, setShowForm] = useState(false);
  // Estado para almacenar los datos del formulario
  const [formRow, setFormRow] = useState({});

  /*------------------------ ACCIONES EN BOTONES ------------------------- */
  const updAction = (row:ItemType) => {
    setFormRow(row);
    setShowForm(true);
  }
  const delAction = (row:ItemType) => {
    setShowForm(false);
    alert(`Has hecho onClick sobre el boton 'Del' de la linea ${Object.values(row)[0]}`)
    deleteObject(row, collect)
  }
  const newAction = () => {
    alert(`Has hecho onClick sobre el boton 'New'`)
    setFormRow({})
    setShowForm(true)
  }
  
  // Escojemos la acción a realizar en función del botón activado
  const btnAction = (row :ItemType, clickedBtn?: 'Del' | 'Upd' | 'New') => {
    let btnClick
    if(!clickedBtn) btnClick=''; else btnClick=clickedBtn
    switch (btnClick) {
      case 'Upd':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable`)
        updAction(row);
        break
      case 'Del':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable`)
        delAction(row);
        break
      case 'New':
        console.log(`Ha entrado en btnAction ${btnClick} de GenericTable`)
        newAction();
        break
      default:  
        alert(`Acción de boton no contemplada: Valor de btnClick=${btnClick}`)
    } 
  }
  /*-------------------------- FIN ACCIONES EN BOTONES -------------------------- */

  // Definimos el boton pulsado y enviamos a seleccionar la acción que realiza el boton Borrar
  const handleButtonDeleteClick = (row:ItemType) => {
    console.log('Ha entrado en handleButtonDeleteClick de TableCollect')
    btnAction(row, 'Del')
  };

  // Definimos el boton pulsado y enviamos a seleccionar la acción que realiza el boton Actualizar
  const handleButtonUpdateClick = (row:ItemType) => {
    console.log('Ha entrado en handleButtonUpdateClick de TableCollect')
    btnAction(row, 'Upd')
  }

  // Definimos el boton pulsado y enviamos a seleccionar la acción que realiza el boton Añadir
  const handleButtonAddLineClick = () => {
    console.log('Ha entrado en handleButtonAddLineClick de TableCollect')
    btnAction(obj[0], 'New')
  }

  // Definimos los botones de cabecera de la tabla
  const renderHeadButtons= ():JSX.Element | undefined => {
    return (  
      <div className="inline-flex">
        <button 
          title='Nueva linea'
          className="bg-gray-300 hover:bg-sky-300 text-sky-800 font-bold py-1 px-4 rounded"
          onClick={()=>handleButtonAddLineClick()}
        >
          <AddIcon/>
        </button>
      </div>
    )
  };

  // Definimos los botones al final de cada linea de la tabla
  const renderLineButtons = (row:ItemType) => {
    return (
    <div className="inline-flex">
      <button 
        title='Borrar linea'
        className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
        onClick={()=>handleButtonDeleteClick(row)}
      > 
        Del
      </button>
      <button
        title='Actualizar linea'
        className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r" 
        onClick={()=>handleButtonUpdateClick(row)}
      >
        Upd
      </button>
      <FormCollect modal={true} collect={collect} row={row} textSubmitButton="Guardar"/> 
    </div>
    )
  };

  return (
    <div className="mt-28 max-h-screen">
      <GenericTable 
        data = {obj} 
        btnAction = {btnAction}
        fieldsToShow = {fieldsToShow} 
        renderHeadButtons = {renderHeadButtons}
        renderLineButtons = {renderLineButtons}
      />
      {showForm && (
        <FormCollect modal={true} collect={collect} row={formRow} textSubmitButton="Guardar"/>
      )}
    </div>
  )
}

export default TableCollect