import React from 'react'


export type TableProps<T> = {
  data:T[];
  renderButtons: (item: T) => React.ReactNode
}

const valueField = (field:any)=>{
  switch(typeof field) {
    case 'boolean': 
        if (field) return 'Si' ; else return 'No';
    default: return field
  }
}

const GenericTable = < T extends Record<string, any>>({data, renderButtons}:TableProps<T>)=>{
  const tableHeaders = Object.keys(data[0] || {})
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapeamos las filas */}
                {data.map((row, rowIndex) => (
                  <tr key={`line${rowIndex}`} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    {/* Mapeamos los campos de cada fila */}
                    {tableHeaders.map((header, headerIndex) => (
                      <td
                        key={`field${headerIndex}`} 
                        className={
                          rowIndex % 2 === 0 
                          ? 'border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'
                          : 'border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'
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
                      {renderButtons(row)}
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
