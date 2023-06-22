import React from "react";
//import ObjState from "../../../firebase/ObjState";
//import GenericTable from "../../03_organismos/GenericTable";
//import useObject from "../../../hooks/useObject";
import TableObj from "./TableObj";
import {SiAddthis as Add} from 'react-icons/si'

// type FamProps = {
//   idFam:string,
//   nombre:string,
//   img?:string
// }

const handleButtonDeleteClick = () => {
  alert('Ha pulsado el botón Del');
};

const handleButtonUpdateClick = () => {
  const message='Has pulsado el boton Update'
  return alert(message)
}

const handleButtonAddLineClick= () => {
  const message='Has pulsado el boton de la cabecera de la tabla'
  return alert(message)
}

// Definimos los botones de cabecera de la tabla
const renderHeadButtons = () => {
  return (
  <div className="inline-flex">
    <button 
      title='Nueva linea'
      className="bg-gray-300 hover:bg-sky-300 text-sky-800 font-bold py-1 px-4 rounded"
      onClick={handleButtonAddLineClick}
    >
      <Add/>
    </button>
  </div>
  )
};

// Definimos los botones al final de cada linea de la tabla
const renderLineButtons = () => {
  return (
  <div className="inline-flex">
    <button 
      title='Borrar linea'
      className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
      onClick={handleButtonDeleteClick}>Del</button>
    <button
      title='Actualizar linea'
      className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r" 
      onClick={handleButtonUpdateClick}>Upd</button>
  </div>
  )
};
const TableFam = () => {

  const fieldsToShow=['nombre']

  return (
    TableObj('families', 'Buscar', 'Familias', fieldsToShow, renderHeadButtons, renderLineButtons)
  )
}

export default TableFam