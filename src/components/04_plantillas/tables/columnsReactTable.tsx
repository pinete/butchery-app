import React, { useState } from 'react'
import {GlobalContextType } from '../../../context/GlobalContext';
import {
  BsTrash as TrashIcon, 
  // BsFillUnlockFill as UnlockFill, 
  // BsLockFill as LockFill,
  // BsTools as Tools,
  // BsPencil as Pencil,
  // BsSearch as Search
} from 'react-icons/bs'
import {FcAddRow as AddRowIcon} from 'react-icons/fc'
import {RiSave3Fill as SaveIcon} from  'react-icons/ri'
import useSweetAlert from '../../../hooks/useSweetAlert'
import { addObject, deleteObject, updateObject} from '../../../firebase/ObjController';


export type ColumnsType = 
  {
    Header: any,
    Footer?: any,
    columns?: ColumnsType,
    accessor?: string,
    style?: any,
    Cell?:({value}:any) => JSX.Element
    //Cell?:() => JSX.Element | any
  }[];

type PropsType = {
  collect:string,
  //optionCollect:string[],
  context?:GlobalContextType,
  isOptionLoading:boolean,
  //setIsLoading?:React.Dispatch<React.SetStateAction<boolean>>,
  optionRows:Record<string, ObjType[]> | undefined,
  //setOptionRows?:React.Dispatch<React.SetStateAction<Record<string, ObjType[]> | undefined>>,
  objLoaded:boolean
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
        // value={editingInputValue}
        // value = {row.values[nameItem]}
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
    console.log('StringKey: ',stringKey)
    return (
      <select 
        key = {`select${stringKey}`}
        ref={selectRef}
        //id={`select ${stringKey}`}
        title={`select ${editingSelectValue}`}
        name={`select ${editingSelectValue}`}
        //defaultValue={editingSelectValue} 
        //defaultValue={textToShow} 
        onChange={(e) => { setEditingSelectValue(e.target.value) }} 
        onBlur={(e) => {
          setEditingSelectId(null)
          if (oldValue !== e.target.value && !sb.includes(row.original.id)) {
            sb.push(row.original.id)
            //No se usa pero no funciona el renderizado del boton en linea 'save' si no esta aquí ????
            setShowSaveBtns([...showSaveBtns, row.original.id])
          }
          if (oldValue === e.target.value && sb.includes(row.original.id))  {
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

export default function ColumnsReactTable({ collect, isOptionLoading, optionRows, objLoaded} :PropsType) {
  const Alert:any = useSweetAlert() // Para poder usar mensaje de alerta al pulsar boton si así se define
  const [sb, setSb] = useState<string[]>([])
  const [showSaveBtns, setShowSaveBtns] = useState<string[]>([])

  //const [textToShow, setTextToShow] = React.useState<string>('')

  //*********************** HANDLER ELEMENTS TYPE  *********************
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
    // Para mostrar los cambios que se producen
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
    //if (!isOptionLoading && objLoaded)
    return (
      <strong 
        key={`strong${row.original.id}`}
        className={'cursor-pointer'}
        onClick={(e) => {
          setEditingInputId(row.original.id);
          setEditingInputValue(value)
          //setEditingInputValue(row.values[nameItem])
        }}
        //defaultValue={row.values[nameItem]}
        //defaultValue={editingInputValue}
       
      >
        {editingInputValue ? editingInputValue : value}
      </strong>
    )
    //else return <p>Wait a moment</p>
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

    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    // Capturo el nombre del item que tiene la misma id que la row de la tabla en la columna (valor que quiero mostrar de la seleccion)
    const selectOption = React.useMemo(()=>options.find(option => option.id === editingSelectValue),[options,editingSelectValue]); 
    textToShow =  selectOption ? String(selectOption[nameItem]) : "notFound";
    
    // Para dar el foco al select si éste se renderiza
    React.useEffect(() => {
      if (editingSelectId === row.original.id && selectRef.current) {
        selectRef.current.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [editingSelectId]);
/*
    // Para  ver los estados actualizados
    React.useEffect(() => {           
      console.log('options: ', options)
      console.log('editingSelectId: ', editingSelectId)
      console.log('editingSelectValue: ', editingSelectValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
*/    

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
          //setEditingSelectValue(!isOptionLoading ? textToShow:'Espere...');
          //setEditingSelectValue(row.values[nameItem])
        }}
      >
        {textToShow}
     
      </p>
      )
  }
  //******************** END HANDLER ELEMENTS TYPE ********************

  //************************** ELEMENTS TYPE ***************************
  /**
   * 
   * @param value Cell.value Valor devuelto por cell
   * @param row Cell.row Objeto devuelto por cell (row.original, row,values, id, etc)
   * @param column Cell.column Objeto devuelto por cell (datos de la columna)
   * @param collectOptName String con el nombre de la coleccion que alimenta las option del select
   * @returns 
   */
  const SelectCell = (value:string, row:any, column:any, collectOptName:string):JSX.Element => {
    //if (isOptionLoading || !optionRows) {
      //if (!objLoaded || !optionRows) {
      if (!objLoaded || isOptionLoading) {
        return <div>Loading...</div>
    } else {
      // if (!isOptionLoading && objLoaded && optionRows) {
      if (optionRows) {
        //const collectOptName = 'families' // Nombre de la coleccion para las opciones del select
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
    }
  }

  /**
   * Boton a pie para la creación de nuevo registro
   * @param newReg Objeto con la estructura del objeto a crear. Campos en blanco excepto el nombre principal como 'New Reg'
   * @returns Boton de creacion de nuevo registro en blanco
   */
  const FooterBtn = (newReg:{}): JSX.Element =>{
    return (
      <div className='flex'>
        <p>Nuevo Registro:</p>
        <button
          key='btnNewReg'
          className='btnTailWind bg-lime-600 hover:bg-lime-800 hover:text-white'
          //onClick={() => alert('has pulsado el boton Nuevo Registro')}
          onClick = {()=>handleNewReg(newReg)}
        >
          <AddRowIcon />
        </button>
      </div>
    )
  }

  const LineBtns = (cell:any): JSX.Element => (
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
  
  //*********************** END ELEMENTS TYPE *************************
  
  //********************* HANDLER ACTIONS BUTTONS *********************/
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
      .then (() => {
        const index = sb.indexOf(row.id)
        setSb(sb.splice(index,1))
        //No se usa pero NO FUNCIONA el renderizado del boton en linea 'save' si no esta aquí ???? :(
        setShowSaveBtns(showSaveBtns.filter(id => id !== row.id))
        Alert.onConfirm(collect, 'updating')

      })
      .catch((error) => {
          console.log('Error: ', error)
          Alert.onError()
        }
      )
  }

  const handleNewReg = (row:ObjType) => { 
    addObject(row, collect)
      .then((newId) => 
        {
          row = {...row, id:newId }
          console.log('Ahora Row es: ', row)
          updateObject(row, collect) //Para incorporar el id generado en el campo id
          alert('Nuevo registro creado. Búsquelo con el nombre "New Reg"')
        }
      )
      
  }
  //******************* END HANDLER ACTIONS BUTTONS *******************/
  
  /******************* DEFINICION DE COLUMNAS SEGÚN LA COLECCIÓN **************/
  let headColumns:ColumnsType

  switch (collect) {
    case 'families':
      headColumns = [
        {
          Header: "Tabla de Familias",
          Footer: "Pie de Familias",
          columns: [
            {
              Header: '', // Cabecera en blanco
              accessor: "id",
              Cell: ({ value }) => { return <input type = "hidden" name = "id" value = {value}/> } // Campo id oculto pero presente en 'row'
            },
            {
              Header:() => <div style={{ textAlign: 'left' }}>Familia</div>,
              Footer:"Familia",
              accessor:"nombre",
              Cell: ({ value, row, column })=>TableInputCell(value, row, column.id),
            },
            {
              Header:() => <div style={{ textAlign: 'left' }}>Imagen</div>,
              Footer: 
                () => {return `es una prueba`}, // Ejemplo de forma de devolver una funcion como dato en el pié
              accessor:"img"
            },
            {
              Header: 'Actions',
              Footer: () => 
                {
                  const newReg = {
                    id:'',
                    nombre:'new reg',
                    img:''
                  }
                  return FooterBtn(newReg)
                },
              Cell: ({cell}) => LineBtns(cell)
            },
            
          ]
        }
      ]
      break;
    case 'subfamilies':
      headColumns = [
        {
          Header: "Tabla de Subfamilias",
          Footer: "Pie de subfamilias",
          columns: [
            {
              Header: '', // Cabecera en blanco
              accessor: "id",
              Cell: ({ value }) => { return <input type = "hidden" name = "id" value = {value}/> } // Campo id oculto pero presente en 'row'
            },
            {
              Header:() => <div style={{ textAlign: 'left' }}>Subfamilia</div>,
              Footer:"Subfamilia",
              accessor:"nombre",
              Cell: ({ value, row, column })=>TableInputCell(value, row, column.id),
            },
            {
              Header: () => <div style={{ textAlign: 'left' }}>Familia</div>,
              Footer: 'Familia',
              accessor: 'idFam', 
              Cell: ({ value, row, column }) => SelectCell (value, row, column, 'families')
            },
            {
              Header: () => <div style={{ textAlign: 'left' }}>Imagen</div>,
              Footer: () => {return `es una prueba`}, // Ejemplo de forma de devolver una funcion como dato en el pié
              accessor: "img"
            },
            {
              Header: 'Actions',
              Footer: () => 
                {
                  const newReg = {
                    id:'',
                    idFam:'',
                    img:'',
                    nombre:'new reg',
                  }
                  return FooterBtn(newReg)
                },
              Cell: ({cell}) => LineBtns(cell)
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
                Header: '', // Cabecera en blanco
                accessor: "id",
                Cell: ({ value }) => { return <input type = "hidden" name = "id" value = {value}/> } // Campo id oculto pero presente en 'row'
              },
              {
                //Header: "Articulo",
                Header: () => <div style={{ textAlign: 'left' }}>Articulo</div>,
                Footer: "Articulo",
                accessor: "nombre",
                //style: { textAlign: 'left' },
                //Cell: ({ value, row })=>TableInputCell(value, row, 'nombre'),
                Cell: ({ value, row, column })=>TableInputCell(value, row, column.id),
              },
              {
                Header: () => <div style={{ textAlign: 'left' }}>Familia</div>,
                Footer: 'Familia',
                accessor: 'idFam', 
                Cell: ({ value, row, column }) => SelectCell (value, row, column, 'families')              
              },         
              {
                Header: () => <div style={{ textAlign: 'left' }}>Subfamilia</div>,
                Footer:"Subfamilia",
                accessor:"idSubFam",
                Cell: ({ value, row, column }) => SelectCell (value, row, column, 'subfamilies')  
              },
              {
                Header: () => <div style={{ textAlign: 'left' }}>Imagen</div>,
                Footer: () => {return `es una prueba`}, // Ejemplo de forma de devolver una funcion como dato en el pié
                accessor:"img"
              },
              {
                Header: 'Actions',
                Footer: () => {
                  const newReg = {
                    id:'',
                    nombre:'new reg',
                    idFam:'',
                    idSubFam:'',
                    img:''
                  }
                  return (
                  
                    <div className='flex'>
                      <p>Nuevo Registro:</p>
                      <button
                        key='btnNewReg'
                        className='btnTailWind bg-lime-600 hover:bg-lime-800 hover:text-white'
                        //onClick={() => alert('has pulsado el boton Nuevo Registro')}
                        onClick = {()=>handleNewReg(newReg)}
                      >
                        <AddRowIcon />
                      </button>
                    </div>
                  )} ,
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