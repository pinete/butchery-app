import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejo de listas
 * @param {function} getObject -> procedimiento get de firestore para capturar datos iniciales
 * @returns {any} value, setValue, push, remove, isEmpty, clear, sort, reverse
 */
const useList = (getObject) => {

    const [value, setValue] = useState([]);
    // console.log('Items en la lista: ', value)

    useEffect(() => { 
        getObject()
            .then(response => {
                setValue([...response]) 
            })
            .catch(error => {
                console.error(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    /**
     * Devuelve el item de la lista correspondiente a la posición index
     * @param {*} index = Indice en la lista
     * @returns item
     */
    const get = (index) => {
        const item = value[index]
        return item
    }

    /**
     * Añade un nuevo elemento a la lista
     * @param {object} element
     */
    const push = (element) => {
        setValue((oldValue) => [...oldValue, element]);
    };

    /**
     * Elimina el elemento de la lista que coincide con el index dado
     * @param {number} index
     */
    const remove = (index) => {
        setValue((oldValue) => oldValue.filter((_, i) => i !== index));
    };

    /**
     * Actualiza el campo de la lista en la posicion dada con el valor dado
     * @param {number} index Posición en la lista
     * @param {string} field Nombre del campo del item de la lista
     * @param {*} newValue Nuevo valor del campo del item de la lista
     */
    const update = (index, field, newFieldValue) => {
      const newList = value;
      newList[index][field] = newFieldValue;
      setValue([...newList]);
    };

    /**
     * Elimina todos los elementos de la lista
     */
    const clear = () => {
        setValue([]);
    };

    /**
     * Devuelve true si la lista está vacía, en caso contrario devuelve false.
     * @returns {boolean}
     */
    const isEmpty = () => value.length === 0;

    /**
     * Ordena alfableticamente la lista
     * @param {*} language 'es' para español (por omision). Use country Code ISO2
     */
    const sort = (language = 'es', field = 'text') => {
        // De esta manera no re-renderiza la lista en TaskList.jsx al ordenarla
        // setValue(newList.sort());

        // De esta manera tampoco re-renderiza la lista en TaskList.jsx
        // const newList = value;
        // newList.sort(
        //     (a, b) => a.localeCompare(b, language, { ignorePunctuation: true }),
        // );
        // setValue(newList);

        // Al crearla desde cero (con push) si controla el cambio y se re-renderiza la lista
        const newList = [];
        value.sort(
            (a, b) => a[field].localeCompare(b[field], language, { ignorePunctuation: true }),
        );
        for (let i = 0; i <= value.length - 1; i++) {
            newList.push(value[i]);
        }
        setValue(newList);
    };

    /**
     * Invierte el orden de la lista
     */
    const reverse = () => {
        // De esta manera no se re-renderiza
        // setValue(value.reverse());

        // de esta manera si se re-renderiza en TaskList.jsx
        /*
        const newList = [];
        for (let i = value.length - 1; i >= 0; i--) {
            newList.push(value[i]);
        }
        setValue(newList);
        // console.log('Lista invertida: ', value);
        */

       // Si uso [...] tambien se renderiza
        setValue([...value.reverse()]);
    };

    return {
            value, setValue, get, push, remove, update, clear, sort, reverse, isEmpty,
        };
};

export default useList;
