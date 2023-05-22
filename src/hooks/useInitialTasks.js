import { useEffect, useState } from 'react'
import { getTasks } from '../firebase/TasksController'

const useInitialTasks = () => {
  const [value, setValue] = useState([])

  const getInitialTasks = () => {
    getTasks()
      .then(response => {
        setValue([...response])
        // console.log('Estado Inicial leido: ', value)
      })
      .catch(error => {
        console.error(error);
        setValue([{text:'problema al cargar tareas iniciales', completed:false}]) 
      })
    return value
  } 
  useEffect(() => { 
    getInitialTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return { value }
}

export default useInitialTasks
