import React from 'react';
import GenericTable from '../../03_organismos/GenericTable';
import {  getSimplifiedObjects } from '../../../firebase/ObjController';
import { ObjListener } from '../../../firebase/ObjListener';

const ExampleTable = () => {
  // Para comprobar si hay que volver a leer la DB por producirse un cambio
  let {isChanged, setIsChanged} = ObjListener('tasks')

  /**
   * Captura el objeto en la base de datos de la colección dada
   * @param collect Nombre de la coleccion
   * @param setTasks Función de useState donde se guarda el objeto
   */
  const capturaObjeto = (collect:string, setTasks:any)=>{
    getSimplifiedObjects('tasks')
      .then ((r) => { 
        setTasks(r) 
      }) 
      .catch((e) => console.error(e))
      .finally(() => setIsChanged(false))
  }

  const [data, setData] = React.useState([{}])
  
  React.useEffect(() => {
    capturaObjeto('tasks', setData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged])
  

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

  // Definimos que campos queremos en la tabla y en que orden
  const tableHeaders:string[]=['pos','article','description','quantity', 'completed']

  // Definimos los botones de cabecera de la tabla
  const renderHeaderButtons = () => {
    return (
    <div className="inline-flex">
      
      <button 
        title='Nueva linea'
        className="bg-gray-300 hover:bg-sky-300 text-sky-800 font-bold py-1 px-4 rounded"
        onClick={handleButtonAddLineClick}>+</button>
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

  return (
    <div>
      {/* fieldsToShow opcional. Si no existe renderiza todos los campos en el orden en que los devuelve firebase (arbitrario) */}
      {/* renderButtons opcional. Si no existe no renderiza los botones ni la cabecera 'Actions' */}
      <GenericTable data={data} fieldsToShow={tableHeaders} renderHeadButtons={renderHeaderButtons} renderLineButtons={renderLineButtons} />
    </div>
  );
};

export default ExampleTable;