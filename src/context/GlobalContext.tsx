import React, { createContext, useState } from 'react';

export type GlobalContextType = {
  globalObjState: object;
  setGlobalObjState: (value: object) => void;
  showSaveBtns: string[];
  setShowSaveBtns: (value: string[]) => void;
}
// Crea el contexto global con el tipo object
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Crea el proveedor del contexto global
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalObjState, setGlobalObjState] = useState<object>({});
  const [showSaveBtns, setShowSaveBtns] = useState<string[]>([])
  // Cualquier otro estado global añadir aqui
  return (
    <GlobalContext.Provider value={{globalObjState, setGlobalObjState, showSaveBtns, setShowSaveBtns}}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider

/* ******************* Para usar GlobalContext en un componente ***********************
import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const MyComponent: React.FC = () => {
  const globalState = useContext(GlobalContext);

  // Accede al objeto global almacenado en globalState
  // ...

  return (
    // Renderiza tu componente
  );
};
*/
