import React from "react";
import { Column, useTable, useGlobalFilter, useSortBy, usePagination, useFilters} from "react-table";
import ObjState from "../../../firebase/ObjState";
//import {GlobalContext} from '../../../context/GlobalContext';
import ColumnsReactTable, { ColumnsType } from "./columnsReactTable";
import MotionInput from "../../01_atomos/MotionInput";
import {BiFirstPage, BiLastPage} from 'react-icons/bi'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import { getSimplifiedObjects } from "../../../firebase/ObjController";

type Props = { 
  collect: string 
  pageCount: number};

type ObjType = {
  [key:string]:any
}

export default function GenericReactTable({ collect, pageCount:controlledPageCount }: Props) {

  // Capturo los contextos globales necesarios
  //const context = useContext(GlobalContext);
  // if (!context) {
  //   throw new Error('useContext was called outside of the GlobalContext provider.');
  // }

  
  // *** Para el caso de los tipo Select, captamos las rows para las options de los Selects según optionCollect ***
  const [isLoading, setIsLoading] = React.useState(true);
  const [optionRows, setOptionRows] = React.useState<Record<string, ObjType[]>> ()
  const optionCollect = ['families', 'subfamilies'] //TODO: Traer este array como propiedad de GenericReactTable

  // Creamos el objeto con las colecciones que se usarán como opciones de los Selects en esta tabla
  React.useEffect(() => {
    setIsLoading(true);
    Promise.all(optionCollect.map(captureOptions))
      .then((results: ObjType[][]) => {
        const optionsObj: Record<string, ObjType[]> = {};
        optionCollect.forEach((collect, index) => {
          optionsObj[collect] = results[index];
        });
        setOptionRows(optionsObj);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  const captureOptions = (collect: string): Promise<ObjType[]> => {
    return getSimplifiedObjects(collect)
      .catch((e) => {
        console.error(e);
        return []; 
      });
  }
  // **************************************** Fin caso de los tipo Select ********************************************

  const { obj } = ObjState(collect);

  type ItemType = (typeof obj)[0];

  const headColumns:ColumnsType = ColumnsReactTable({collect, isLoading, setIsLoading, optionRows, setOptionRows});
  //const columns = React.useMemo<Column<ItemType>[]>(() => headColumns, []);
  //actualizamos columns cuando cambian las dependencias y por tanto se rerenderiza (caso de las ids)
  const columns = React.useMemo<Column<ItemType>[]>(() => headColumns, [isLoading, optionRows]); 

  const tableInstance = useTable(
    { columns, 
      data: obj,
      //defaultColumn: { Filter: DefaultFilterForColumn },
      //autoResetPage: false, 
      initialState: { pageIndex: 0, pageSize: controlledPageCount },
      //manualPagination: true, // Para autogestionar la paginación en el caso de querer recuperar del backend un determinado nº de filas en cada solicitud
      pageCount: controlledPageCount
    }, 
    useGlobalFilter, // Plugin para activar el filtrado de datos globales
    //useFilters, // Plugin para activar el filtrado de datos por columna
    useSortBy, // Plugin para activar la ordenación de datos
    usePagination // Plugin para activar la paginación de filas
  );
  const {
    getTableProps, // Propiedades de la etiqueta <table>
    getTableBodyProps, // Propiedades de la etiqueta <body>
    headerGroups, //  datos de la etiqueta <thead> que incluye getHeaderGroupProps por cada uno de los items de la cabecera
    footerGroups, //  datos de la etiqueta <tfoot> que incluye getFooterGroupProps por cada uno de los items del pie
    rows, // Array con todas las filas
    prepareRow, // Función que prepara las filas para ser mostradas
    page, // Array de filas paginadas
    canPreviousPage, // Conocer si podemos ir a la página anterior
    canNextPage, // Conocer si podemos  ir a la página siguiente
    pageOptions,
    pageCount,
    gotoPage,
    previousPage, // Función ir a la página anterior
    nextPage, // Funcion ir a la página siguiente
    setPageSize,
    preGlobalFilteredRows, // Array con las filas filtradas
    setGlobalFilter, // Actualiza valor del input para ir filtrando la tabla
    //state // Estado de la tabla en ese momento y página en la que estamos
    state: { pageIndex, pageSize, globalFilter }
  } = tableInstance;

  return (
    <div className="mt-28 max-h-screen flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto ">
            <table {...getTableProps()}>
            {/* <table key={isLoading ? 'selectsLoading' : 'selectsLoaded'}{...getTableProps()}>Pretendo que re-renderice al cambiar isLoading */}
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-4">{/* Propiedades de cada columna y de ordenación */}
                        {column.render("Header")}{/* Método render para pintar las cabeceras */}
                        <span>
                          {column.isSorted 
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, rowIndex) => { // mapeo 'page' por la paginacion, para mostrar todas las filas sería 'rows'
                  prepareRow(row); // Preparamos la fila para pintarla (optimizacion de memoria; yo decido cuando dejar preparada la fila en el momento de ser pintada)
                  //console.log('Row de Page: ',row)
                  return (
                    // tr con propiedades de la linea
                    <tr {...row.getRowProps()} 
                      className="border-b hover:text-sky-900"> 
                      {row.cells.map((cell, cellIndex) => { 
                        return <td  {...cell.getCellProps()}
                          className={
                            rowIndex % 2 === 0 
                            ? 'pl-3 border-b bg-neutral-200  dark:border-neutral-500 dark:bg-neutral-700'
                            : 'pl-3 border-b bg-white  dark:border-neutral-500 dark:bg-neutral-600'
                          }>{cell.render("Cell")}
                        </td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-b bg-gray-600 font-medium text-white dark:border-gray-500 dark:bg-gray-900">
                {footerGroups.map((group) => (
                  <tr {...group.getFooterGroupProps()}>
                    {group.headers.map((column) => (
                      <td {...column.getFooterProps()}>
                        {column.render("Footer")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="flex justify-around">
              <p>Total de registros: {preGlobalFilteredRows.length}</p>
              <MotionInput value={globalFilter} placeholder='Filtrar' onChange={(e) => setGlobalFilter(e.target.value)}/>
              <p>Registros filtrados: {rows.length}</p>
            </div>
            <div className="pagination flex justify-around">
              <span>
                Página
                <strong>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>
              </span>
              <div className="controls">
                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <BiFirstPage className="page-controller" />
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <MdKeyboardArrowLeft className="page-controller" />
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  <MdKeyboardArrowRight className="page-controller" />
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <BiLastPage className="page-controller" />
                </button>
              </div>
              <select 
                className="bg-gray-200 block min-h-[auto] py-1 px-2 shadow rounded-lg outline-none focus:ring-1 mr-2 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-70 transition-all duration-200 ease-out " 
                name='selectNroLines'
                title='selectNroLines'
                value={pageSize} 
                onChange={e => setPageSize(Number(e.target.value))}>
                  {[5, 10, 15].map((pageSize, i) => (
                  <option className="bg-gray-300" key={pageSize} value={pageSize} title={`optionNroPages${pageSize}`}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
