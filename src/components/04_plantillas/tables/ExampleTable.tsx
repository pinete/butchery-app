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

  const [tasks, setTasks] = React.useState([{}])
  
  React.useEffect(() => {
    capturaObjeto('tasks', setTasks)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged])
  
  const data = tasks
  //console.log('Tasks: ',tasks)
  
  const handleButtonDeleteClick = () => {
    alert('Ha pulsado el botón Del');
  };

  const handleButtonUpdateClick = () => {
    const message='Has pulsado el boton Update'
    return alert(message)
  }

  const renderButtons = () => {
    return (
    <div className="inline-flex">
      <button 
        className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
        onClick={handleButtonDeleteClick}>Del</button>
      <button
        className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r" 
        onClick={handleButtonUpdateClick}>Upd</button>
    </div>
    )
  };

  return (
    <div>
      <GenericTable data={data} renderButtons={renderButtons} />
    </div>
  );
};

export default ExampleTable;