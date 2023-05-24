import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejo de listas
 * @param {function} getObject -> procedimiento get de firestore para capturar datos iniciales
 * @returns {any} value, setValue, push, remove, isEmpty, clear, sort, reverse
 */
const useList = (getObject) => {

    const [value, setValue] = useState([]);
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
     * Actualiza con el valor dado el campo de la lista indicado en la posicion dada 
     * @param {number} index Posición en la lista
     * @param {string} field Nombre del campo del item de la lista
     * @param {*} newValue Nuevo valor del campo del item de la lista
     */
    const updateField = (index, field, newFieldValue) => {
      const newList = value;
      newList[index][field] = newFieldValue;
      setValue([...newList]);
    };
    
    /**
     * Actualiza el item (objeto) recibido en la posicion dada
     * @param {*} index Posición en la lista
     * @param {*} newItem Nuevo item (objeto) a actualizar en la lista
     */
    const updateItem = (index, newItem) => {
        const newList = value;
        newList[index] = newItem;
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
    const sort = (language = 'es', field = 'article') => {
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
        setValue([...value.reverse()]);
    };

    return {
            value, setValue, get, push, remove, updateField, updateItem, clear, sort, reverse, isEmpty,
        };
};

export default useList;
