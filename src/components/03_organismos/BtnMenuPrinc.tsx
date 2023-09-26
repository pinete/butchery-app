/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SubMenuOpen = {
  maintenance:boolean,
}

const initSubOpen:SubMenuOpen = {
  maintenance: false,
}

// const BtnMenuPrinc: React.FC <{ menuItems: MenuItem[] }> = ({ menuItems }) => {
const BtnMenuPrinc: React.FC  = ({ showSettings, setShowSettings }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen]=useState<SubMenuOpen>(initSubOpen)

  const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  // Cerramos los submenus abiertos y cambiamos a su contrario el submenu dado
  let updatedSubMenuOpen: SubMenuOpen
  const handleSubmenuToggle = (propertyName:string) => {
    const keys:string[] = Object.keys(isSubOpen)
    let updatedItems:Record<string, boolean> = {...isSubOpen}
    keys.forEach((key, index) => {
      //updatedItems[key] = key === propertyName ? updatedItems[key] :  false
      // updatedItems[key] = key === propertyName ? updatedItems[key] = !updatedItems[key] :  updatedItems[key] = false
      key === propertyName ? updatedItems[key] = !updatedItems[key] :  updatedItems[key] = false
      updatedSubMenuOpen = {...isSubOpen, [key]: updatedItems[key],};
    })
    setIsSubOpen(updatedSubMenuOpen);
  };

  const navigate = useNavigate()

  const handleOptionClick = (path:string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative z-10">
        <button  onClick={toggleMenu}>
          <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
            {isOpen && 
              <div className="transform transition-all duration-150 overflow-hidden translate-y-3 group-focus:translate-y-3 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            }
            {!isOpen && 
              <div className="transform transition-all duration-150 overflow-hidden text-white">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            }
          </div>
        </button>
      {isOpen && (
        <div className="absolute left-0 mt-4 w-48 bg-white rounded-md shadow-lg">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-200" onClick={()=>handleOptionClick('/')}>Home</li>
            <li className="px-4 py-2 hover:bg-gray-200" onClick={()=>handleOptionClick('/task')}>Encargos</li>
            <li className="px-4 py-2 hover:bg-gray-200" onClick={()=>handleSubmenuToggle('maintenance')}>{'Mantenimientos >'}</li>
              {isSubOpen.maintenance && <>
                <ul className="py-2">
                  <li className="px-4 py-2 bg-gray-100 hover:bg-gray-300 ml-6" onClick={()=>handleOptionClick('/maintenance/families')}>Familias</li>
                  <li className="px-4 py-2  bg-gray-100 hover:bg-gray-300 ml-6" onClick={()=>handleOptionClick('/maintenance/subfamilies')}>Subfamilias</li>
                  <li className="px-4 py-2  bg-gray-100 hover:bg-gray-300 ml-6" onClick={()=>handleOptionClick('/maintenance/articles')}>Articulos</li>
                </ul>
                  </>
                }
              
            <li className="px-4 py-2 hover:bg-gray-200"  onClick={()=>handleOptionClick('/tableArticles')} >Tabla Articulos</li>
            <li className="px-4 py-2 hover:bg-gray-200"  onClick={()=>handleOptionClick('/tableFamilies')} >Tabla Familias</li>
            <li className="px-4 py-2 hover:bg-gray-200"  onClick={()=>handleOptionClick('/tableSubfamilies')} >Tabla Subfamilias</li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <a href="#">Opción 2</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <a href="#">Opción 3</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BtnMenuPrinc;