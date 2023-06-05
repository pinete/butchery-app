import React from 'react'

// export type TableProps = {
//   data:Record<string, any>
// }
export type TableProps<T> = {
  data:T[];
  renderButtons: (item: T) => React.ReactNode
}

// const GenericTable:React.FC<TableProps> = ({ data }) => {
const GenericTable = < T extends Record<string, any>>({ data, renderButtons}:TableProps<T>) => {
  const tableHeaders = Object.keys(data[0] || {})
  // const tableRows = Object.values(data) 
  //console.log('tableHeaders: ',tableHeaders)
  //console.log('tableRows: ', tableRows)

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th 
                      key = {index} 
                      scope="col" 
                      className="px-6 py-4"
                    >
                      {header}
                    </th>
                  ))}
                  <th></th> {/*Espacio para los botones*/}
                </tr>
              </thead>
              <tbody>
                {/* { tableRows.map((row, index) => 
                  (
                    <tr key={`line${index}`} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      {tableHeaders.map((header, headerIndex) => (
                        <td 
                          key={`field-${index}-${headerIndex}`}
                          className=
                          {
                            index % 2 === 0 
                            ? 'border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700'
                            : 'border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'
                          }
                        > 
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  )
                )} */}
                {data.map((row, rowIndex) => (
                  <tr key={`line${rowIndex}`} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                    {tableHeaders.map((header, headerIndex) => (
                      <td key={headerIndex} className="px-6 py-4">
                        {row[header]}
                      </td>
                    ))}
                    <td className="px-6 py-4">
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
