import React, { useState, useEffect} from 'react'
import {GlobalContextType } from '../../../context/GlobalContext';
import {
  BsTrash as TrashIcon, 
  BsFillUnlockFill as UnlockFill, 
  BsLockFill as LockFill,
  BsTools as Tools,
  BsPencil as Pencil,
  BsSearch as Search
} from 'react-icons/bs'
import {RiSave3Fill as SaveIcon} from  'react-icons/ri'
import useSweetAlert from '../../../hooks/useSweetAlert'
import { deleteObject, updateObject} from '../../../firebase/ObjController';

export type ColumnsType = 
    {
    Header: string;
    Footer?: any
    columns?: ColumnsType,
    accessor?: string
    Cell?:({value}:any) => JSX.Element
  }[];

type PropsType = {
  collect:string,
  context?:GlobalContextType,
  isLoading:boolean,
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
  optionRows:Record<string, ObjType[]> | undefined,
  setOptionRows:React.Dispatch<React.SetStateAction<Record<string, ObjType[]> | undefined>>
}
// type ContextType = {
//   showSaveBtns:string[],
//   setShowSaveBtns:(value: string[]) => void;
// }
type ObjType = {
  [key:string]:any
}
type SelectType = {
  row:RowType;
  column:any;
  optionRow:ObjType[];
  selectOption:ObjType | undefined
  selectRef:React.MutableRefObject<HTMLSelectElement | null>;
  stringKey:string,
  nameItem:string;
  editingSelectValue:any;
  setEditingSelectValue:(value: any) => void;
  setEditingSelectId:(value: any) => void;
  showSaveBtns: string[];
  setShowSaveBtns:(value: any) => void;
  oldValue:string;
  sb:string[],
  setSb:(value: any) => void;
  multiple?:boolean;
}
type InputType = {
  row:RowType;
  inputRef:React.MutableRefObject<HTMLInputElement | null>;
  nameItem:string
  editingInputValue:any;
  setEditingInputValue:(value: any) => void;
  setEditingInputId:(value: any) => void;
  showSaveBtns: string[];
  setShowSaveBtns:(value: any) => void;
  oldValue:string;
  sb:string[],
  setSb:(value: any) => void;
}
type RowType = {
  allCells:ObjType[];
  cells:ObjType[];
  depth: number;
  getRowProps:()=>void;
  id:string;
  index:number;
  original:ObjType;
  originalSubRows:[];
  values:ObjType;
}

let textToShow:string
const Input = (
  {
    row, 
    inputRef,
    nameItem, 
    editingInputValue, 
    setEditingInputValue,
    setEditingInputId,
    showSaveBtns,
    setShowSaveBtns,
    oldValue,
    sb,
    setSb,

  }:InputType):JSX.Element => {
    return (
    <input 
        key={`input${row.original.id}`}
        ref={inputRef}
        defaultValue={editingInputValue} 
        // onChange={(e) => { setEditingInputValue(e.target.value)}} 
        onChange={() => { setEditingInputValue(inputRef.current?.value)}} 
        onBlur={(e) => {
          setEditingInputId(null)
          if (oldValue !== e.target.value && !sb.includes(row.original.id)) {
            //setSb(prevSb => [...prevSb, row.original.id])
            sb.push(row.original.id)
            //No se usa pero no funciona el renderizado del boton en linea 'save' si no esta aquí ????
            setShowSaveBtns([...showSaveBtns, row.original.id])
            
            
          }
          if (oldValue === e.target.value && sb.includes(row.original.id))  {
            const index = sb.indexOf(row.original.id)
            setSb(sb.splice(index,1))
            //No se usa pero no funciona el renderizado del boton en linea 'save' si no esta aquí ???? :(
            setShowSaveBtns(showSaveBtns.filter(id => id !== row.original.id))
          }
          // Actualizamos row.values con el nuevo valor
          // row.values[nameItem] = e.target.value
          // row.values[nameItem] = inputRef.current?.value
          row.values[nameItem] = editingInputValue

        }}       
      />
  )
}

const Select = (
  { row,
    column,
    optionRow,
    selectOption,
    nameItem,  
    stringKey, 
    selectRef,
    editingSelectValue, 
    setEditingSelectValue,
    setEditingSelectId,
    showSaveBtns,
    setShowSaveBtns,
    oldValue,
    sb,
    setSb,
  }:SelectType):JSX.Element => {
    console.log('StringKey: ',row.values[nameItem])
    return (
      <select 
        //key={stringKey}
        key = {`select${stringKey}`}
        ref={selectRef}
        //id={`select ${stringKey}`}
        title={`select ${editingSelectValue}`}
        name={`select ${editingSelectValue}`}
        //defaultValue={editingSelectValue} 
        //defaultValue={textToShow} 
        onChange={(e) => { setEditingSelectValue(e.target.value)}} 
        onBlur={(e) => {
          setEditingSelectId(null)
          if (oldValue !== e.target.value && !sb.includes(row.original.id)) {
          // if (selectOption?.id !== e.target.value && !sb.includes(row.original.id)) {
            //setSb(prevSb => [...prevSb, row.original.id])
            sb.push(row.original.id)
            //No se usa pero no funciona el renderizado del boton en linea 'save' si no esta aquí ????
            setShowSaveBtns([...showSaveBtns, row.original.id])
            // Actualizamos row.values con el nuevo valor
            //row.values[nameItem] = e.target.value
            // row.values[nameItem] = editingSelectValue

          }
          if (oldValue === e.target.value && sb.includes(row.original.id))  {
          // if (selectOption?.id === e.target.value && sb.includes(row.original.id))  {
            const index = sb.indexOf(row.original.id)
            setSb(sb.splice(index,1))
            //No se usa, pero no funciona el renderizado del boton en linea 'save' si no esta aquí ???? :(
            setShowSaveBtns(showSaveBtns.filter(id => id !== row.original.id))
          }
          row.values[column.id]=selectRef.current?.value
        }}       
      >
        {optionRow.map((row:any, i:number) => (
          <>
             {/* {row.id === oldValue && */}
             {row.id === selectOption?.id &&
              <option selected
                key={`${stringKey}${i}`}
                value={row.id}
              >
                {row[nameItem]}
              </option>
            } 
            {/* {row.id !== oldValue &&  */}
            {row.id !== selectOption?.id && 
              <option 
                key={`${stringKey}${i}${i}`}
                value={row.id}
              >
                {row[nameItem]}
              </option> 
            } 
          </>
        ))} 
      </select>
  )
}

export default function ColumnsReactTable({ collect, isLoading, setIsLoading, optionRows, setOptionRows} :PropsType) {
  const Alert:any = useSweetAlert() // Para usar mensaje de alerta al pulsar boton si así se define
  const [sb, setSb] = useState<string[]>([])
  const [showSaveBtns, setShowSaveBtns] = useState<string[]>([])
  //const [textToShow, setTextToShow] = useState<string>("")

  /*********************** HANDLER ELEMENTS TYPE  *********************/
  const TableInputCell = (
    value:string, 
    row:any, 
    nameItem:string 
  ) => {
    const oldValue = value
    const [editingInputId, setEditingInputId] = useState<string | null>(null);
    const [editingInputValue, setEditingInputValue] = useState(row.values[nameItem]);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
   
/*
    React.useEffect(() => {
      console.log('editingInputId: ', editingInputId)
      console.log('editingInputValue: ', editingInputValue)
      console.log('sb: ', sb)
      // console.log('context showSaveBtns: ', showSaveBtns)

    }, [editingInputId, editingInputValue]);
*/
    // Para dar el foco al input si éste se renderiza
    React.useEffect(() => {
      if (editingInputId === row.original.id && inputRef.current) {
        inputRef.current.focus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingInputId]);

    if ((editingInputId) === row.original.id) {
      return <Input 
        row={row} 
        inputRef={inputRef} 
        nameItem={nameItem}
        editingInputValue={editingInputValue} 
        setEditingInputValue={setEditingInputValue} 
        setEditingInputId={setEditingInputId} 
        showSaveBtns={showSaveBtns} 
        setShowSaveBtns={setShowSaveBtns} 
        oldValue={oldValue} 
        sb={sb} 
        setSb={setSb}
      />
    }

    return (
      <strong 
        key={`strong${row.original.id}`}
        className={'cursor-pointer'}
        onClick={(e) => {
          setEditingInputId(row.original.id);
          setEditingInputValue(value)
        }}
        defaultValue={editingInputValue}
      >
        {editingInputValue ? editingInputValue : value}
      </strong>)
  }

  const TableSelectCell = (
    actualValue:string, 
    row:any, 
    column: any,
    collectOptName:string, 
    options: ObjType[],
    nameItem:any 
  ):JSX.Element => {
    const oldValue = actualValue

    const [editingSelectId, setEditingSelectId] = useState<string | null>(null);
    const [editingSelectValue, setEditingSelectValue] = useState<string>(actualValue);

    React.useEffect(() => {
      if (editingSelectId === row.original.id && selectRef.current) {
        selectRef.current.focus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingSelectId]);

    console.log('Al renderizar TableSelectCell oldValue es: ',oldValue)
    console.log('Al renderizar TableSelectCell actualValue es: ',actualValue)
    console.log('Al renderizar TableSelectCell editingSelectValue es: ',editingSelectValue)

    const selectRef = React.useRef<HTMLSelectElement | null>(null);
    const selectOption = options.find(option => option.id === editingSelectValue); // Capturo el item que tiene la misma id que la row de la tabla en la columna 
    //textToShow = selectOption ? String(selectOption[column.id]) : "notFound"; // Capturo el valor que quiero mostrar de la seleccion
    textToShow = selectOption ? String(selectOption[nameItem]) : "notFound"; // Capturo el valor que quiero mostrar de la seleccion
    
    //setTextToShow(selectOption ? String(selectOption[nameItem]) : "notFound")
    
    // Para dar el foco al select si éste se renderiza
      React.useEffect(() => {
        if (editingSelectId === row.original.id && selectRef.current) {
          selectRef.current.focus();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [editingSelectId]);

    // Para actualizar y ver los estados actualizados
    React.useEffect(() => {           
      console.log('options: ', options)
      //console.log('editingSelectId: ', editingSelectId)
      console.log('editingSelectValue: ', editingSelectValue)
      //console.log('sb: ', sb)
      //console.log('optionRows',optionRows)
    },[])
    

    if ((editingSelectId) === row.original.id) {
      return (
        <Select 
          row={row} 
          column = {column}
          optionRow={optionRows ? optionRows[collectOptName] : []} 
          selectOption = {selectOption}
          nameItem={nameItem}
          stringKey={new Date().getTime().toString()} // en milisegundos
          selectRef={selectRef} 
          editingSelectValue={editingSelectValue} 
          setEditingSelectValue={setEditingSelectValue} 
          setEditingSelectId={setEditingSelectId} 
          showSaveBtns={showSaveBtns} 
          setShowSaveBtns={setShowSaveBtns} 
          oldValue={oldValue} 
          sb={sb} 
          setSb={setSb}
        />
      )  
    }
    
    return (
      <p 
        key={`strong${row.original.id}`}
        className={'cursor-pointer'}
        onClick={(cell) => {
          setEditingSelectId(row.values.id);
          setEditingSelectValue(textToShow)
        }}
      >
        {textToShow}      
      </p>)
  }
  /********************* END HANDLER ELEMENTS TYPE ********************/
  
  /********************** HANDLER ACTIONS BUTTONS *********************/
  const handleDelete = (value:any) => {
    Alert.onDelete(()=>deleteObject(value, collect), collect)
  }
  const handleUpdate = (row:ObjType) => {

    console.log('Row en handleUpdate: ',row)
    const temp = row
    delete temp.Actions
    Object.entries(temp).forEach(([key, value]) => {
      console.log('key: ', key)
      console.log('value: ', value)
      if (value === 'undefined' ) temp[key] = String(''); else temp[key] = String(temp[key])
    })

    updateObject(temp, collect)

    const index = sb.indexOf(row.id)
    setSb(sb.splice(index,1))
    //No se usa pero no funciona el renderizado del boton en linea 'save' si no esta aquí ???? :(
    setShowSaveBtns(showSaveBtns.filter(id => id !== row.id))
  }
  /******************** END HANDLER ACTIONS BUTTONS *******************/

  /******************* DEFINICION DE COLUMNAS SEGÚN LA COLECCIÓN **************/
  let headColumns:ColumnsType

  switch (collect) {
    case 'subfamilies':
      headColumns = [
        {
          Header: "Tabla de Subfamilias",
          Footer: "Pie de subfamilias",
          columns: [
            {
              Header:"Id",
              Footer:"Id",
              accessor:"id"
            },
            {
              Header:"Familia",
              Footer:"Familia",
              accessor:"idFam"
            },
            {
              Header:"Subfamilia",
              Footer:"Subfamilia",
              accessor:"nombre",
              Cell: ({value}) => <strong>{value}</strong> // Ejemplo poner Negrita para la celda Subfamilia
            },
            {
              Header:"Imagen",
              Footer: 
                () => {return `es una prueba`}, // Ejemplo de forma de devolver una funcion como dato en el pié
              accessor:"img"
            },
          ]
        }
      ]
      break;
      case 'articles':
        headColumns = [
          {
            Header: "Tabla de Artículos",
            Footer: "Pie de Artículos",
            columns: [   
              {
                Header: "Id",
                Footer: "Id",
                accessor: "id"
              },
              {
                Header: "Articulo",
                Footer: "Articulo",
                accessor: "nombre",
                //Cell: ({ value, row })=>TableInputCell(value, row, 'nombre'),
                Cell: ({ value, row, column })=>TableInputCell(value, row, column.id),
              },
              {
                Header: 'Familia',
                Footer: 'Familia',
                accessor: 'idFam', 
                Cell: ({ value, row, column }) => {
                  if (isLoading || !optionRows) {
                    return <div>Loading...</div>
                  } else {
                    if (optionRows) {
                      const collectOptName = 'families' // Nombre de la coleccion para las opciones del select
                      const nameItem = 'nombre' // Nombre de la key que vamos a mostrar de la coleccion de opciones
                      return TableSelectCell(
                        value, 
                        row, 
                        column,
                        collectOptName,
                        optionRows[collectOptName],
                        nameItem 
                      )}
                    else return <div>Wait...</div>
                  }},
              },         
              {
                Header:"Subfamilia",
                Footer:"Subfamilia",
                accessor:"idSubFam",
                Cell: ({ value, row, column, cell}) => {
                  
                  console.log('CELL: ', cell)

                  if (isLoading || !optionRows) {
                    return <div>Loading...</div>
                  } else {
                    if (optionRows) {
                      const collectOptName = 'subfamilies'
                      //console.log('value en Cell: ',value)
                      return TableSelectCell(
                        value, 
                        row, 
                        column,
                        collectOptName,
                        optionRows[collectOptName],
                        'nombre')
                    } else return <div>Wait...</div>
                  }
                }
              },
              {
                Header:"Imagen",
                Footer: 
                  () => {return `es una prueba`}, // Ejemplo de forma de devolver una funcion como dato en el pié
                accessor:"img"
              },
              {
                Header: "Actions",
                Cell: ({ cell }) => (
                  <div className='justify-around' key={`divGroupLineBtns${cell.row.original.id}`}>
                    <button 
                      key={`btnDel${cell.row.original.id}`}
                      className='btnTailWind bg-red-600 hover:bg-red-800 hover:text-white'  
                      value={cell.row.original.id} 
                      onClick={()=>handleDelete(cell.row.original)}
                    >
                      <TrashIcon/>
                    </button>
                    {(sb.includes(String(cell.row.original.id))) && 
                      <button 
                        key={`btnSave${cell.row.original.id}`}
                        className='btnTailWind bg-sky-600 hover:bg-sky-800 hover:text-white'  
                        value={cell.row.original.id} 
                        onClick={()=>{
                          console.log('CELL:', cell)
                          handleUpdate(cell.row.values)
                        }} 
                      >
                        <SaveIcon/>
                      </button>
                    }
                  </div>
                )              
              }
            ]
          }
        ]
        break;
    default:
      headColumns = [{
        Header:"Sin Datos",
        accessor:'id'
      }]
      break;
  }
  return headColumns

}