import React, { useState } from 'react';
import useList from '../../../hooks/useList';
import useSweetAlert from '../../../hooks/useSweetAlert'
import { motion } from 'framer-motion'
import MotionButton from '../../01_atomos/MotionButton'
import { addObject, deleteObject, getObjects, toggleObjectKey } from '../../../firebase/ObjController'

interface linAssignmentProps {
  completed:boolean,
  text:string,
  id:string, 
  created:Date,
  modified:Date
}
// Usamos Tailwind para los estilos y framer-motion para las animaciones
// Al asociar, por ejemplo un boton, a motion lo que hacemos es añadirle nuevas posibilidades de props

/**
 * Componente que gestiona la lista de tareas
 * @returns (React.Component)
 */
const TaskList = ({ showSettings, setShowSettings }:any):JSX.Element => {
  const [newTask, setNewTask] = useState('');
  const tasks = useList(() => getObjects('tasks'))
  const alert = useSweetAlert()

  /**
   * Añade una nueva tarea a BD. Si todo OK la añade tambien a la 
   * lista para ser mostrada, y en todos los casos vacía el input.
   */
  const addNewTask = () => {
    // Si está vacio no hace nada
    if (newTask === "") return; 
    // Añadimos una nueva tarea a la base de datos
    const obj:linAssignmentProps = { text: newTask, completed: false ,id:'', created:new Date(), modified:new Date()}
    addObject(obj, 'tasks')
    // Cuando se haya añadido a la DB la incorporamos a la lista 
    // incluyendo el id devuelto para usarlo en futuros cambios
    .then((id) => {
      // console.log('task en taskList: ', id)
      obj.id = id
      tasks.push(obj);
      })
      // Si se produce un error
      .catch((e) => {
        console.error(e)
      })
      // En cualquier caso
      .finally(() => setNewTask(''));
  };

  /**
   * Borra de la DB y de la lista la tarea seleccionada con la posicion index
   * @param {*} index  Posicion en la lista
   */
  const delTask = (index:number) => {
    //Funcion enviada a sweetAlert para el caso de confirmación
    const deleteItemDBAndList = () => {
      const item:linAssignmentProps = tasks.get(index)
      deleteObject(item,'tasks')
        .then(() => tasks.remove(index))
        .catch((e) => console.error(e))
    }
    alert.onDelete(deleteItemDBAndList, 'task')
  }    

  /**
   * Manejador de estado de la tarea  ( completada / pendiente)
   * Actualiza el estado en la lista usando las funciones del hook personalizado useList
   * Actualiza el estado en la BD usando la funcion de firebase/index.js 'toggleObjectKey'
   * @param {number} index Posicion en el array de tareas
   * @param {boolean} value Valor del campo 'completed'
   */
  const toggleCompleted = (index:number, value:boolean) => {
    // Actualizar DB con el nuevo valor de la tarea
    const item = tasks.get(index)
    // console.log('Item seleccionado en handlerCompleted: ', item)
    item.modified = new Date()
    toggleObjectKey( item, 'completed', 'tasks' )
      // Cuando se haya cambiado la tarea en la DB incorporamos el cambio a la lista para ser mostradas
      .then(() => {
        tasks.update( index, 'completed', !value );  
      })
      // Si se produce un error
      .catch((e) => {
        console.error(e)
      })
  };

  /**
   * Cambiar el estado de mostrar Settings
   */
  const toggleSettings = () => {setShowSettings(!showSettings)}
  
  // Configuracion base de TailWind.
  /*
  const btnTailWind = "shadow py-1 px-2 rounded hover:text-white transition duration-200"
  const inputTailWind = "shadow py-1 px-2 rounded-lg outline-none focus:ring-2 mr-2 transition-all duration-300"
  */
  // ATENCION: Lo puedo usar así, insertandolo luego en la clase de esta forma: "className={`${inputTailWind} dark:bg-slate-700`}"
  // pero tambien puedo crear la clase TailWind en index.css (abre el archivo CSS para ver como)
  
  return (
    <>
      <header className='flex justify-between max-h-full'>
        <h1 className='text-3xl text-sky-700 font-semibold dark:text-sky-300'>
          Butchery v2
        </h1>
        <MotionButton
          key={`btn6`}
          textButton={!showSettings ? 'Show Settings' : 'Hide Settings'}
          onclick={toggleSettings}
        />
      </header>
      <div>
        <div className='my-4'>
          <input
            className={`inputTailWind dark:bg-slate-700`}
            type="text"
            value={newTask}
            onKeyDown={(e) => e.key === 'Enter' && addNewTask()} // añade nueva tarea al pulsar tecla 'ENTER' sobre el input
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
          />
          {/* Button NewTask */}
          <MotionButton 
            key={`btn7`}
            textButton={'Create Task'}
            onclick={addNewTask}
          />
        </div>
        { tasks.isEmpty()
            ? (<p className='bg-sky-700'>Task List is Empty</p>)
            : (
              <ul>           
                {tasks.value.map((task:linAssignmentProps, index:number) => (
                  <motion.li 
                    initial={{ x: '100vw' }} 
                    animate = {{ x:0 }} 
                    key={index} 
                    className='flex items-center list-none' >
                    {/* Boton DEL */}
                    <MotionButton 
                      key={`btn1${index}`}
                      textColorHover='white'
                      bg='red-400'
                      bgHover='red-600'
                      bgDark='red-600'
                      bgHoverDark='red-800'
                      icon='Trash'
                      onclick={()=>delTask(index)}
                    />
                    {/* Boton DONE/TODO */}
                    <MotionButton 
                      key={`btn2${index}`}
                      textButton={task.completed ? 'Done' : 'ToDo'}
                      textColorHover={'white'}
                      bg={task.completed ? 'amber-400' : 'lime-400'}
                      bgHover={ task.completed ? 'amber-600' : 'amber-600' }
                      bgDark={ task.completed ? 'amber-600' : 'lime-600' }
                      bgHoverDark={ task.completed ? 'amber-800' : 'lime-800' }
                      onclick = { ()=>toggleCompleted(index, task.completed) }
                    />
                    {/* Texto de la tarea */}
                    <span 
                      key={`s1${index}`} 
                      className={`ml-2 text-sm italic dark:text-gray-100 ${
                          task.completed ? 'text-gray-400 line-through' :  'text-gray-800'
                        }`
                      }
                    >
                      {task.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
        <section className="mt-2" role="group" aria-label="Action Buttons">
          {/* Boton CLEAR SCREEN */}
          <MotionButton 
            key={`btn3`}
            textButton='Clear screen'
            textColorHover='white'
            bg={'red-400'}
            bgHover={'red-600'}
            bgDark={'red-600'}
            bgHoverDark={'red-800'}
            onclick={tasks.clear}
          />
          {/* Boton SORT */}
          <MotionButton 
            key={`btn4`}
            textButton='Sort'
            textColorHover='white'
            bg={'purple-400'}
            bgHover={'purple-600'}
            bgDark={'purple-600'}
            bgHoverDark={'purple-800'}
            onclick={tasks.sort}
          />
          {/* Boton REVERSE */}
          <MotionButton 
            key={`btn5`}
            textButton='Reverse'
            textColorHover='white'
            bg={'teal-400'}
            bgHover={'teal-600'}
            bgDark={'teal-600'}
            bgHoverDark={'teal-800'}
            onclick={tasks.reverse}
          />
        </section>
      </div>
    </>
  );
};

export default TaskList;
