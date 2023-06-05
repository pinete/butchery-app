import React from 'react';
import GenericTable from '../../03_organismos/GenericTable';

const data = [
  { nombre: 'Antonio', edad: '30', dni: '23332332A' },
  { nombre: 'Pepe', edad: '20', dni: '23332333A' },
  { nombre: 'Juan', edad: '40', dni: '23332334A' },
];

const ExampleTable = () => {
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