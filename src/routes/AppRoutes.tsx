import React  from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// NOTA: el v6 Navigate sustituye a Redirect (Redirect to='/' pasa a ser Navigate replace to='/') 
import TaskList from '../components/04_plantillas/lists/TaskList';
import NotFoundPage404 from '../components/05_vistas/NotFoundPage-404'
import Header from '../components/03_organismos/Header';
import Home from '../components/05_vistas/Home';
import TableCollect from '../components/04_plantillas/tables/TableCollect';
import GlobalProvider from './../context/GlobalContext';
import { motion, AnimatePresence } from 'framer-motion';
import Settings from '../settings/Settings';

interface configProps {
  theme: string, 
  lang: string
}

function AppRoutes() { 
  //TODO Change to value from sessionStorage (or somethink dynamic)
  
  //const [loggedIn, setLoggedIn] = useState(false)
  //const [credentials, setCredentials] = useState(localStorage.getItem('credentials'))

  
  /* Para seleccionar el estado de loggedIn
  useEffect(() => {
    setCredentials(localStorage.getItem('credentials'))
     if (typeof credentials === 'object') 
       setLoggedIn(true); 
     else 
      setLoggedIn(false)
     console.log('User Logged?', loggedIn)
  }, [credentials])
  */

  /* FUNCIONES DE SELECCION DE COMPONENTE
   Al poner la condicion dentro de Router me 'peta' ya que la version v6 solo admite 
   componentes, así que la creo como componente y devuelvo el componente correspondiente
   según esté logueado o no
   */
  /*
  function LoginAction() {
    return loggedIn ? <TaskList/> : <Navigate to = '/login' replace = {true} />;
  };

  function TasksAction() {
    if (!loggedIn )alert ('You must be logged in. Redirecting to login')
    return loggedIn ? <TaskList/> : <Navigate to = '/login' />;
  };
*/

  const user={name:'Joaquin Morales'}
  /**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */

  // Para que la aplicación esté al tanto de los cambios de modo de pantalla...
  const [dark, setDark] = React.useState("light");
  // Para que la aplicación sepa cuando mostrar los settings...
  const [showSettings, setShowSettings] = React.useState(false);
  // Configuracion inicial en localStorage de config si no existe (para la configuracion de estilo)
  const defaultConfig: configProps = {theme: "light", lang: "en"}

  /*
    Con useEffect se crea una variable de estado donde se almacena
    el valor de la configuracion del tema (modoPantalla) de LocalStorage
    cada vez que cambia la variable de estado 'dark'
   */
  // Si no existe (ocurre en la primera ejecucion) crea la variable local por defecto
  // eslint-disable-next-line eqeqeq
  if ( localStorage.getItem('config') == undefined ) 
    localStorage.setItem('config', JSON.stringify(defaultConfig)) ;

  React.useEffect(() => { 
    const config:configProps = JSON.parse(localStorage.getItem('config') || JSON.stringify(defaultConfig))
    setDark(config.theme); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  /**
   * Función para intercambiar la variable de estado Dark a true / false
   */
  const toggleDark = () => dark === 'dark' ? setDark('ligth') : setDark('dark');
  const AnimateSettings = ()=> {
    return (
    <AnimatePresence 
      initial={false}
      mode='wait'
      onExitComplete={() => null}
    >
      {showSettings && 
          <motion.div 
            initial={{ y:'100vh' }} 
            animate={{ y:'0' }} 
            exit={{ y:'100vh' }}
          >
            <Settings toggleDark={ toggleDark } />
          </motion.div>
      }
    </AnimatePresence>
    )
  }
 
  return (
    <GlobalProvider>
      <div>
         <BrowserRouter> 
            <Header user={user} onLogout={()=>{alert('Ha pulsado LogOut')}} AnimateSettings={AnimateSettings}/>
            {/* Route Switch */}
            <Routes>
                {/* Redirections to protect our routes */}
                <Route path='/' element = {<Home />} />
 
                 {/*Task Route */}
                <Route path = '/task' element = {<TaskList showSettings={showSettings} setShowSettings={setShowSettings}/>}/>

                {/* Families Route */}
                <Route path = '/maintenance/families' element = {<TableCollect collect='families' fieldsToShow={['nombre']} />}/>

                {/* SubFamilies Route */}
                <Route path = '/maintenance/subfamilies' element = {<TableCollect collect='subfamilies' fieldsToShow={['idFam','nombre']} />}/>
                
                {/* NotFound Route */}          
                <Route path = '*' element = {<NotFoundPage404/>}/>
              
            </Routes>

        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default AppRoutes