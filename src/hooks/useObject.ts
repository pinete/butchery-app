import { useState } from 'react';
import useList from './useList';
import useSweetAlert from './/useSweetAlert'

import { addObject, deleteObject, getObjects, getSimplifiedObjects, toggleObjectKey, updateObject } from '../firebase/ObjController'

interface LastUsedBtnProps {
  value?: 'get' | 'add' | 'upd' | 'del' 
}

/**
 * 
 * @param collect Coleccion
 * @param obj Un item de la coleccion
 * @returns lastAction, setLastAction, objList, updObj, addNewObject, delObj, toggleField
 */
const useObject = (collect:string, obj:object) => {
  const [lastAction,setLastAction] = useState<LastUsedBtnProps>()
  const [newObj, setNewObj] = useState<typeof obj>(obj);
  const objList = useList(() => getSimplifiedObjects(collect))
  //const [newIndex, setNewIndex] = useState<number>(-1)
  
  const alert = useSweetAlert()
  
  const updObj=(index:number)=>{
    setLastAction({value:'upd'}) 
    const item = objList.get(index)
    item.modified = new Date()
    // actualizo en DB
    updateObject(obj, collect)
    // Cuando se haya añadido a la DB la incorporamos a la lista 
    // incluyendo el id devuelto para usarlo en futuros cambios
    .then(() => {
      setNewObj(obj)
      objList.updateItem(index, obj)
    })
    .catch((e) => {console.error(e)})
    // En cualquier caso
    .finally(() => {setNewObj({})})
  }
  
  /**
   * Añade una nueva tarea a BD. Si todo OK la añade tambien a la 
   * lista para ser mostrada, y en todos los casos vacía el input.
   */
  const addNewObject = () => {
    setLastAction({value:'add'})
    // Si está vacio no hace nada
    if (!newObj) {
      //TODO aviso de que tienen que estar rellenos
      return
    } 

    // Añadimos una nueva tarea a la base de datos
    const id = addObject(obj, collect)
    /*  Cuando se haya añadido a la DB la incorporamos a la lista 
        incluyendo el id devuelto para usarlo en futuros cambios 
    */
      .then(() => {
        setNewObj({...newObj, id})
        objList.push(obj);
      })
      // Si se produce un error
      .catch((e) => {console.error(e)})
      // En cualquier caso
      .finally(() => setNewObj({})
    )
  };

  /**
   * Borra de la DB y de la lista la tarea seleccionada con la posicion index
   * @param {*} index  Posicion en la lista
   */
  const delObj = (index:number) => {
    setLastAction({value:'del'})
    
    const deleteItemDBAndList = () => {
      const item:typeof obj = objList.get(index)
      deleteObject(item,collect)
        .then(() => objList.remove(index))
        .catch((e) => console.error(e))
        .finally(() => setNewObj({}))
    }
    //Funcion enviada a sweetAlert para el caso de confirmación
    alert.onDelete(deleteItemDBAndList, collect)
  }    

  /**
   * Manejador de un estado booleano del objeto ( p.ej. completada / pendiente)
   * Actualiza el estado en la lista usando las funciones del hook personalizado useList
   * Actualiza el estado en la BD usando la funcion de firebase/index.js 'toggleObjectKey'
   * @param {number} index Posicion en el array de tareas
   * @param {string} field nombre del campo booleano a invertir 
   * @param {boolean} value Valor del campo field
   */
  const toggleField = (index:number, field:string, value:boolean) => {
    setLastAction({value:'upd'})
    // Actualizar DB con el nuevo valor de la tarea
    const item = objList.get(index)
    item.modified = new Date()
    toggleObjectKey( item, field, collect )
      .then(() => {objList.updateField( index, field, !value )})
      .catch((e) => {console.error(e)})
      .finally(()=>{setNewObj({})})
  };


  return {
    lastAction, setLastAction, objList, updObj, addNewObject, delObj, toggleField, 
  }
}

export default useObject
