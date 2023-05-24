import * as React from 'react'; // Para que funcione con Flow
import { Header } from './components/03_organismos/Header';
import TaskList from './components/04_plantillas/lists/TaskList'
import Settings from './settings/Settings';
// importamos animaciones framer-motion
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */

interface configProps {
  theme: string, 
  lang: string
}

const App = ():JSX.Element => {
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

  return (
    
    // Si config.theme es 'dark' añade la clase 'dark'
    <div className={`${dark === 'dark' ? 'dark' : ''}`}> {/* añadimos clase dark si en localStorage la variable dark es true */}
      <div 
        className={`h-screen p-4 flex-col  bg-gray-100
           dark:bg-slate-800 transition
           dark:text-gray-50
        `}> {/* Control de modo oscuro. Si 'dark' entonces bg-slate-800  y text-gray-50*/}
        <TaskList showSettings={showSettings} setShowSettings={setShowSettings}/>
        {/* Componente Settings envuelto en un div con animaciones motion 
            Funciona la animacion de entrada pero no la salida al haber 
            sido desmontado el componente */}
        {/* {showSettings && 
          <motion.div 
            initial={{ y:'100vh' }} 
            animate={{ y:'0' }} 
            exit={{ y:'100vh' }}
          >
            <Settings toggleDark={ toggleDark } />
          </motion.div>
        } */}

        {/* Componente Settings envuelto en AnimatePresence que 
          permite continuar la animación cuando se desmonta el componente */}
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
      </div>
    </div>
  );
};

export default App;
