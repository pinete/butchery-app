import React, { useEffect, useRef, useState } from 'react';

// useBooleanHook
const useBoolean = (initialValue) => {
  // este Hook personalizado se encargará de setear el estado y
  // mediante la referencia discernir entre diferentes funcionalidades (on, of, toggle)
  // Devolverá el value y el tipo de función utilizada
  const [value, setValue] = useState(initialValue);
  const updateValue = useRef(
    {
      // toggle: () => setValue(!value) // lo siguiente es equivalente a esto
      toggle: () => setValue((oldValue) => !oldValue),
      on: () => setValue(true),
      off: () => setValue(false),
    },
  );
  return [value, updateValue.current];
  // updateValue.current nos permite saber si se refiere a un on, off o un toggle
};

const EjemploUseBoolean = () => {
  const [lista, setLista] = useState([]);

  // Uso de useBoolean
  const [cargando, setCargando] = useBoolean(false);
  const [error, setError] = useBoolean(false);

  // Al iniciar el componente, cargamos la lista
  useEffect(() => {
    setCargando.on(); // Ponemos el 'on' de 'cargando a true
    // llamamos a una Api para cargar la lista (en este caso de usuarios)
    fetch('http://reqres.in/users')
      .then((response) => response.json())
      .then(setLista)
      .catch((error) => {
        alert(`Ha ocurrido un error: ${error}`);
        setError.on(); // Ponemos el 'on' de 'error' a true
      })
      .finally(() => setCargando.off());
  }, [lista, setCargando, setError]);

  return (
    <div>
      <p>{cargando ? 'cargando...' : null}</p>
      <p>{error ? 'Ha ocurrido un error' : null}</p>
    </div>
  );
};

export default EjemploUseBoolean;
