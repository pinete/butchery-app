import React from 'react'

export type TableProps<T> = {
  data: T[];
  btnClick?:'Del' | 'Upd' | 'New' | '';
  setBtnClick?:React.Dispatch<React.SetStateAction<'Del' | 'Upd' | 'New' | ''>>;
  fieldsToShow?: string[];
  renderHeadButtons?: (action?: ()=>void) => React.ReactNode;
  //renderLineButtons?: (item: T) => React.ReactNode;
  renderLineButtons?: (action?: ()=>void) => React.ReactNode;
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
const GenericTable = < T extends Record<string, any>>({data, btnClick, setBtnClick, fieldsToShow, renderHeadButtons, renderLineButtons}:TableProps<T>)=>{

  //type DataType = typeof data
  //type DataItemType = typeof data[0];

  const updAction = (row:T) => {
    alert(`Has hecho onClick sobre el boton 'Upd' de la linea ${row.pos} de id ${row.id} y nombre ${row.nombre} y el boton es ${btnClick}`)
  }
  const delAction = (row:T) => {
    alert(`Has hecho onClick sobre el boton 'Del' de la linea ${row.pos} de id ${row.id} y nombre ${row.nombre} y el boton es ${btnClick}`)
  }
  const newAction = () => {
    alert(`Has hecho onClick sobre el boton 'New' y el boton es ${btnClick}`)
  }
  

  const btnAction = (row:T) => {
    switch (btnClick) {
      case 'Upd':
        console.log('Ha entrado en btnAction UPD de GenericTable')
        updAction(row);
        //alert(`btnClick ha cambiado a ${btnClick}` )
        break
      case 'Del':
        console.log('Ha entrado en btnAction DEL de GenericTable')
        delAction(row);
        //alert(`btnClick ha cambiado a ${btnClick}` )
        break
      case 'New':
        console.log('Ha entrado en btnAction NEW de GenericTable')
        newAction();
        //alert(`btnClick ha cambiado a ${btnClick}` )
        break
      default:  
        alert(`Acción de boton no contemplada: Valor de btnClick=${btnClick}`)
        //setBtnClick('')
    } 
  }

  // Si no especificamos campos a mostrar, pinta todos  
  let tableHeaders:string[]
  if (fieldsToShow === undefined) tableHeaders = Object.keys(data[0] || {}); 
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
                      className="px-6 py-4"
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
                          {renderHeadButtons(()=>btnAction(data[0]))}
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
                        {renderLineButtons && renderLineButtons(()=>btnAction(row))}
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
