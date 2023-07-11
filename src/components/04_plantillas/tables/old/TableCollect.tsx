import React, {useState} from "react";

import {SiAddthis as AddIcon} from 'react-icons/si'


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
  const [btnClick, setBtnClick] = useState<'Del' | 'Upd' | 'New' | '' >('')  
  // Definimos la acción que realiza el boton Borrar
  const handleButtonDeleteClick = (action:Function) => {
    console.log('Ha entrado en handleButtonDeleteClick de TableCollect')
    setBtnClick('Del')
    //setTimeout(function(){}, 3000);
    console.log(`btnClick ahora es ${btnClick} en TableCollect`)
    action()
  };

  // Definimos la acción que realiza el boton Actualizar
  // const handleButtonUpdateClick = (action:()=>void) => {
    const handleButtonUpdateClick = (action:Function) => {
    console.log('Ha entrado en handleButtonUpdateClick de TableCollect')
    setBtnClick('Upd')
    console.log(`btnClick ahora es ${btnClick} en TableCollect`)
    action()
  }

  // Definimos la acción que realiza el boton Añadir
  // const handleButtonAddLineClick = (action:()=>void) => {
  const handleButtonAddLineClick = (action:Function) => {
    console.log('Ha entrado en handleButtonAddLineClick de TableCollect')
    setBtnClick('New')
    console.log(`btnClick ahora es ${btnClick} en TableCollect`)
    action()
  }

  // Definimos los botones de cabecera de la tabla
  // const renderHeadButtons = (action?:()=>void) => {
  const renderHeadButtons = (action?:()=>{}) => {
    let btnAction:Function=()=>{}
    if (action) btnAction=action
    return (  
      <div className="inline-flex">
        <button 
          title='Nueva linea'
          className="bg-gray-300 hover:bg-sky-300 text-sky-800 font-bold py-1 px-4 rounded"
          onClick={()=>handleButtonAddLineClick(btnAction)}
        >
          <AddIcon/>
        </button>
      </div>
    )
  };

  // Definimos los botones al final de cada linea de la tabla
  const renderLineButtons = (action?: ()=>void) => {
    let btnAction=()=>{}
    if (action) btnAction=action
    return (
    <div className="inline-flex">
      <button 
        title='Borrar linea'
        className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
        onClick={()=>handleButtonDeleteClick(btnAction)}
      > 
        Del
      </button>
      <button
        title='Actualizar linea'
        className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r" 
        onClick={()=>handleButtonUpdateClick(btnAction)}
      >
        Upd
      </button>
    </div>
    )
  };

  return (
    <div className="mt-28">
      {/* {TableObj(collect, fieldsToShow, btnClick, setBtnClick, renderHeadButtons, renderLineButtons)} */}
    </div>
  )
}

export default TableCollect