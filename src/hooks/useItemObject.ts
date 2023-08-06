import { useEffect, useState } from 'react';

interface ObjectData {
    [key: string]: any;
  }

export interface UseListMethods {
    value: ObjectData;
    setValue: React.Dispatch<React.SetStateAction<any[]>>;
    push: (element: any) => void;
    del: (field: string) => void;
    upd: (key: string, value:any) => void;
    isEmpty: () => boolean;
}

/**
 * Hook personalizado para manejo de objetos en formato {key:value, ...}
 * @param {ObjectData} row Elemento en formato {key:value, ...}
 * @returns {any} value, setValue, new, del, upd, isEmpty
 */
const useItemObject = (row:ObjectData): UseListMethods => { 
    const [value, setValue] = useState<typeof row>({})

    useEffect(() => {
      setValue(row)
    }, [row])
    
    console.log('Value en useItemObject', value)

    /**
     * Añade un nuevo atributo y valor al objeto
     * @param {ObjectData} element Nuevo elemento en formato {key:value}
     */
    const push = (element: ObjectData) => {
        setValue((prevValue) => ({
            ...prevValue,
            [element.key]: element.value,
        }));
      };

    /**
     * Elimina el elemento del objeto que coincide con el campo dado
     * @param {string} field Nombre del atributo a eliminar en el objeto
     */
    const del = (field: string) => {
        setValue((prevValue) => {
            const newValue = { ...prevValue };
            delete newValue[field];
            return newValue;
        });
    };

    /**
     * Actualiza con el valor dado el campo del atributo indicado  
     * @param {string} key  Clave del elemento
     * @param {any} value  Valor del elemento
     */
    const upd = (key: string, value: any) => {
            setValue((prevValue) => ({
                ...prevValue,
                [key]: value,
            }));
        };
    

    /**
     * Devuelve true si el objeto está vacío, en caso contrario devuelve false.
     * @returns {boolean}
     */
    const isEmpty = (): boolean =>  Object.keys(value).length === 0;

    


    return {value, setValue, push, del, upd, isEmpty};
};

export default useItemObject;
