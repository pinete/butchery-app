import React, { useState, useContext } from 'react';
import useList from '../../../hooks/useList';
import useSweetAlert from '../../../hooks/useSweetAlert'
import { motion } from 'framer-motion'
import MotionButton from '../../01_atomos/MotionButton'
import MotionTextArea from '../../01_atomos/MotionTextArea'
import MotionInput from '../../01_atomos/MotionInput'
import { addObject, deleteObject, getObjects, toggleObjectKey, updateObject } from '../../../firebase/ObjController'
import ModalComponent from '../dialog/ModalComponent';
//import TableFam from '../tables/TableFam';
import TableCollect from '../tables/TableCollect';
//import FormFam from '../forms/FormFam';
import { GlobalContext } from '../../../context/GlobalContext';



interface linTaskProps {
  completed:boolean,
  article:string,
  quantity:string,
  description:string,
  id:string, 
  created:Date | undefined,
  modified:Date | undefined
}

const emptyNewTask = {
  completed:false,
  article:'',
  quantity:'',
  description:'',
  id:'', 
  created:undefined,
  modified:undefined
}
// Usamos Tailwind para los estilos y framer-motion para las animaciones
// Al asociar, por ejemplo un boton, a motion lo que hacemos es añadirle nuevas posibilidades de props

/**
 * Componente que gestiona la lista de tareas
 * @returns (React.Component)
 */
const TaskList = ({ showSettings, setShowSettings }:any):JSX.Element => {
  const [newTask, setNewTask] = useState<linTaskProps>(emptyNewTask);
  const [newIndex, setNewIndex] = useState<number>(-1)
  const tasks = useList(() => getObjects('tasks'))
  const alert = useSweetAlert()
  const [btnUpdClick, setBtnUpdClick] = useState<boolean>(false);

  //Capturamos las variables Globales
  const globalState = useContext(GlobalContext);
  console.log('GlobalState: ',globalState)

  //const articleRef = useRef<HTMLInputElement | null>(null)
  
  const updateTask=(index:number)=>{
    setBtnUpdClick(true) // Cambiamos el boton a Nueva Linea
    if (newTask.article === "" || newTask.quantity === '' ) {
      //TODO aviso de que tienen que estar rellenos
      return
    }
    // Actualizo en DB
    const obj = newTask
    obj.modified = new Date()
    updateObject(obj, 'tasks')
    // Cuando se haya añadido a la DB la incorporamos a la lista 
    // incluyendo el id devuelto para usarlo en futuros cambios
    .then((id) => {
      setNewTask(obj)
      tasks.updateItem(newIndex, newTask)
      
      
    })
    .catch((e) => {
      console.error(e)
    })
    // En cualquier caso
    .finally(() => setNewTask(emptyNewTask))
  }
  
  /**
   * Añade una nueva tarea a BD. Si todo OK la añade tambien a la 
   * lista para ser mostrada, y en todos los casos vacía el input.
   */
  const addNewTask = () => {
    
    // Si está vacio no hace nada
    if (newTask.article === "" || newTask.quantity === '' ) {
      //TODO aviso de que tienen que estar rellenos
      return
    } 
    // Añadimos una nueva tarea a la base de datos
    const obj:linTaskProps = { article: newTask.article, quantity: newTask.quantity, description: newTask.description, completed: false ,id:'', created:new Date(), modified:new Date()}
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
      .finally(() => setNewTask(emptyNewTask))
  };

  /**
   * Reconoce boton como update, captura el objeto de la linea, inicializa index y posiciona el cursos al principio de la página
   * @param index 
   */
  const changeTask = (index:number) => {
    setBtnUpdClick(true)
    setNewTask(tasks.get(index))
    setNewIndex(index)
    document.documentElement.scrollTo(0, 0); // ir al inicio de la página
  }

  /**
   * Borra de la DB y de la lista la tarea seleccionada con la posicion index
   * @param {*} index  Posicion en la lista
   */
  const delTask = (index:number) => {
    //Funcion enviada a sweetAlert para el caso de confirmación
    const deleteItemDBAndList = () => {
      const item:linTaskProps = tasks.get(index)
      deleteObject(item,'tasks')
        .then(() => tasks.remove(index))
        .catch((e) => console.error(e))
    }
    setBtnUpdClick(false)
    setNewTask(emptyNewTask)
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
        tasks.updateField( index, 'completed', !value );  
      })
      // Si se produce un error
      .catch((e) => {
        console.error(e)
      })
    setBtnUpdClick(false)
    setNewTask(emptyNewTask)
  };

  /*
  const changeProperty = (e:any, field:string) => { 
    const newItem = {...newTask}; 
    // if (typeof `${field}` === 'boolean') {
    //   newItem[field as keyof linTaskProps] = e.target.checked as boolean;
    // } else {
    //   newItem[field as keyof linTaskProps] = e.target.value as string;
    // }
    setNewTask(newItem);
  }
  */

  /**
   * Cambiar el estado de mostrar Settings
   */
  const toggleSettings = () => {setShowSettings(!showSettings)}
  

  return (
    <>
      <header className='flex justify-between max-h-full z-0 mt-28'>
        <h1 className='mt-2 text-3xl text-sky-700 font-semibold dark:text-sky-300'>
          Encargos
        </h1>
        <MotionButton
          key={`btn6`}
          textButton={!showSettings ? `Mostrar` : `Ocultar`}
          icon={'Tools'}
          onclick={toggleSettings}
        />
      </header>
      <div className='justify-between max-h-full z-0'>
        <div className='my-4'>
          <div className='flex items-center'>
            <MotionInput key='inputArticle'
              bg={'sky-100'}
              bgHover={'sky-400'}
              bgDark = {'slate-700'}
              value={newTask.article}
              // onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTask()} // añade nueva tarea al pulsar tecla 'ENTER' sobre el input
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
                {
                  const newItem = {...newTask};
                  newItem.article = e.currentTarget.value
                  setNewTask(newItem);
                }
              }
              placeholder={'¿Que quieres comprar?'}
            />
            {/* <span key='ModalTableFam'>
              // Modal de tabla de familias 
              {ModalComponent (
                {
                  title:'Familias', 
                  buttonProps:{
                    textColorHover: 'white',
                    bg: 'sky-400',
                    bgHover: 'sky-600',
                    bgDark: 'sky-600',
                    bgHoverDark: 'sky-800',
                    icon: 'Search'
                  }, 
                  children:<TableCollect collect='subfamilies' fieldsToShow={['nombre']}/>
                }
              )}
            </span> */}
            {/* <span key ='ModalFormFam'>
              {/* Modal de Formulario de familias */}
              {/* {ModalComponent (
                {
                  title:'Familias', 
                  buttonProps:{
                    textColorHover: 'white',
                    bg: 'sky-400',
                    bgHover: 'sky-600',
                    bgDark: 'sky-600',
                    bgHoverDark: 'sky-800',
                    icon: 'Search'}, 
                  children:FormFam ('p3z4Qar9MD8EWJTcW3Yn')
                }
              )}
            </span> */}
          </div>
          <MotionInput key='inputQuantity'
            bg={'sky-100'}
            bgHover={'sky-400'}
            bgDark = {'slate-700'}
            value={newTask.quantity}
            // onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTask()} // añade nueva tarea al pulsar tecla 'ENTER' sobre el input
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
              {
                const newItem = {...newTask};
                newItem.quantity = e.currentTarget.value
                setNewTask(newItem);
              }
            }
            placeholder={'¿Cuanto quieres?'}
          />
          <MotionTextArea key='textAreaDescription'
            textLabel={'¿Cómo lo quieres?'}
            bg= {'sky-100'}
            bgHover= {'sky-400'}
            bgDark = {'slate-700'}
            value={newTask.description}
            //onKeyDown={(e:React.ChangeEvent<HTMLInputElement>) => e.keyCode === 'Enter' && addNewTask()} // añade nueva tarea al pulsar tecla 'ENTER' sobre el input
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
              {
                const newItem = {...newTask};
                newItem.description = e.target.value 
                console.log(e.target.value)
                setNewTask(newItem);               
              }
            }
            placeholder="Describe cómo lo quieres"
          />
          {/* Button NewTask */}
          <MotionButton 
            // key={`btn7`}
            textButton={btnUpdClick ? 'Actualiza Linea':'Nueva Linea'}
            onclick={btnUpdClick ? ()=> updateTask(newIndex) : addNewTask}
          />
        </div>
        { tasks.isEmpty()
            ? (<p className='bg-sky-700'>Task List is Empty</p>)
            : (
              <ul>           
                {tasks.value.map((task:linTaskProps, index:number) => (
                  <motion.li 
                    initial={{ x: '100vw' }} 
                    animate = {{ x:0 }} 
                    key={`li_${index}`} 
                    className='flex items-center list-none' >
                    {/* Boton DEL */}
                    <MotionButton 
                      key={`btnDel${index}`}
                      textColorHover='white'
                      bg='red-400'
                      bgHover='red-600'
                      bgDark='red-600'
                      bgHoverDark='red-800'
                      icon='Trash'
                      onclick={()=>delTask(index)}
                    />
                    {/* Boton UPDATE */}
                    <MotionButton 
                      key={`btnUpd-${index}`}
                      icon='Pencil'
                      onclick={()=>changeTask(index)}
                    />
                    {/* Boton DONE/TODO */}
                    <MotionButton 
                      key={`btnCompleted-${index}`}
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
                      key={`spanTxt-${index}`} 
                      className=
                      {`
                        ml-2 
                        text-sm 
                        italic
                         dark:text-gray-100 
                        ${task.completed ? 'text-gray-400 line-through' :  'text-gray-800'}`
                      }
                    >
                      {`${task.article} - ${task.quantity} - ${task.description}`}
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
            textButton='Ordenar'
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
            textButton='Invertir'
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
