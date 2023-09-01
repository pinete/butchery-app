import React from 'react'

export type TableProps<T> = {
  data: T[];
  //btnAction:(row:T, clickedBtn: 'Del' | 'Upd' | 'New') => void;
  fieldsToShow?: string[];
  renderHeadButtons?: () => JSX.Element |undefined;
  renderLineButtons?:(row:T)=> React.ReactNode;
}

const valueField = (field:any)=>{
  switch(typeof field) {
    case 'boolean': 
        if (field) return 'Si' ; else return 'No';
    default: return field
  }
}

/**
 * Componente genérico para mostrar una tabla con los fields de un objeto y con ActionsButtons al final de cada row
 * @param  data - array de objetos
 * @param  fieldsToShow - Optional array de fields a mostrar. Si no existe, pinta todos los fields en el orden en el que firebase devuelve el objeto 
 * @param  renderButtons - Botones React.ReactNode
 * @returns Tabla JSX.Element
 */
// const GenericTable = < T extends Record<string, any>>({data, btnClick, setBtnClick, fieldsToShow, renderHeadButtons, renderLineButtons}:TableProps<T>)=>{
const GenericTable = < T extends Record<string, any>>({data, fieldsToShow, renderHeadButtons, renderLineButtons}:TableProps<T>)=>{
  console.log('Ha entrado en GenericTable')
  // Si no especificamos campos a mostrar, pinta todos  
  let tableHeaders:string[]
  if (fieldsToShow === undefined) tableHeaders = Object.keys(data[0]); 
  else tableHeaders = fieldsToShow
  
  return (
    
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
    
              <thead
                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  {/* Obtenemos titulos de columnas de cabecera + columna "Actions" */}
                  {tableHeaders.map((header, index)=>(
                    <th
                      key = {index} 
                      scope="col" 
                      className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900"
                    >
                      {header}
                    </th>
                  ))}
                  {renderHeadButtons && (
                    <th>Actions
                      {renderHeadButtons && (
                        <span 
                          key = {`buttonHeader`} 
                          className="px-6 py-4"
                        > 
                          {renderHeadButtons()}
                        </span>
                        )
                      } 
                    </th> )                      
                  }
                </tr>
              </thead>

              <tbody>
                {/* Mapeamos las filas */}
                {data.map((row:T, rowIndex) => (
                    <tr 
                      key={`line${rowIndex}`} 
                      className="border-b hover:font-bold"
                    >
                      {/* Mapeamos los campos de cada fila */}
                      {tableHeaders.map((header, headerIndex) => (
                        
                        <td 
                          key={`field${headerIndex}`} 
                          className={
                            rowIndex % 2 === 0 
                            ? 'border-b bg-neutral-200  dark:border-neutral-500 dark:bg-neutral-700'
                            : 'border-b bg-white  dark:border-neutral-500 dark:bg-neutral-600'
                          }
                        >
                          {valueField(row[header])}                    
                        </td>
                        
                      ))}
                      <td 
                        key={`buttonsField${rowIndex}`}
                        className={
                          rowIndex % 2 === 0 
                          ? 'border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'
                          : 'border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'
                        }
                      >
                        {renderLineButtons && renderLineButtons(row)}
                      </td>
                    </tr>
                  
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GenericTable
