import React, { useState } from 'react'
import {GlobalContextType } from '../../../context/GlobalContext';
import {
  BsTrash as Trash, 
  BsFillUnlockFill as UnlockFill, 
  BsLockFill as LockFill,
  BsTools as Tools,
  BsPencil as Pencil,
  BsSearch as Search
} from 'react-icons/bs'
import {RiSave3Fill as Save} from  'react-icons/ri'
import useSweetAlert from '../../../hooks/useSweetAlert'
import { deleteObject, getSimplifiedObjects } from '../../../firebase/ObjController';
import { waitUntil } from 'workbox-core/_private';

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
  context?:GlobalContextType
}
type ContextType = {
  showSaveBtns:string[],
  setShowSaveBtns:(value: string[]) => void;
}
type ObjType = {
  [key:string]:any
}
type SelectType = {
  row:RowType;
  optionRow:ObjType[];
  selectRef:React.MutableRefObject<HTMLSelectElement | null>;
  index:number,
  nameItem:string;
  editingValue:any;
  setEditingValue:(value: any) => void;
  setEditingId:(value: any) => void;
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
  editingValue:any;
  setEditingValue:(value: any) => void;
  setEditingId:(value: any) => void;
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

const Input = (
  {
    row, 
    inputRef, 
    editingValue, 
    setEditingValue,
    setEditingId,
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
        value={editingValue} 
        onChange={(e) => { setEditingValue(e.target.value) }} 
        onBlur={(e) => {
          setEditingId(null)
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
        }}       
      />
  )
}

const Select = (
  { row,
    optionRow,
    nameItem,  
    index, 
    selectRef,
    editingValue, 
    setEditingValue,
    setEditingId,
    showSaveBtns,
    setShowSaveBtns,
    oldValue,
    sb,
    setSb,
  }:SelectType):JSX.Element => {
    const obj = optionRow[index]
    return (
      <select 
        key={`select${nameItem}`}
        ref={selectRef}
        value={editingValue} 
        onChange={(e) => { setEditingValue(e.target.value) }} 
        onBlur={(e) => {
          setEditingId(null)
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
        }}       
      >
        {obj.map((row:any, i:number) => (
          <option 
            key={`option${nameItem}${i}`}
            value={row[i].id}>
            {row[i][nameItem]}
          </option>
        ))}
        
      </select>
  )
}

export default function ColumnsReactTable({collect, context}:PropsType) {
  const Alert:any = useSweetAlert()
  
  const optionCollect = ['families', 'subfamilies']

  const [sb, setSb] = React.useState<string[]>([])
  const [showSaveBtns, setShowSaveBtns] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [optionRow, setOptionRow] = useState<ObjType[]>([])

  // Para el caso de los tipo Select, captamos las rows para las options según optionCollect
  React.useEffect(() => {
    setIsError(false)
    const captureOptions = (collect:string): Promise<ObjType[]>=>{
      return getSimplifiedObjects(collect)
        .then ((r) => { 
          //setOptionRow(prevOptionRow => [...prevOptionRow, r])
          console.log('Respuesta: ',r)
          return r;
        }) 
        .catch((e) => {
          setIsError(true)
          console.error(e)
          return [] ;  // Devolvemos un objeto vacío en caso de error
        }) 
        
    }

    Promise.all(optionCollect.map(captureOptions))
    .then((results: ObjType[][]) => {
      setOptionRow(results);
      setIsLoading(false);
    });
  }, [])



  
  /*********************** HANDLER ELEMENTS TYPE  *********************/
  const TableInputCell = (value:string, row:any ) => {
    const oldValue = value
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState(row.values.nombre);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
   

    React.useEffect(() => {
      console.log('editingId: ', editingId)
      console.log('editingValue: ', editingValue)
      console.log('sb: ', sb)
      // console.log('context showSaveBtns: ', showSaveBtns)

    }, [editingId, editingValue]);

    // Para dar el foco al input si éste se renderiza
    React.useEffect(() => {
      if (editingId === row.original.id && inputRef.current) {
        inputRef.current.focus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingId]);

    if ((editingId) === row.original.id) {
      return <Input 
        row={row} 
        inputRef={inputRef} 
        editingValue={editingValue} 
        setEditingValue={setEditingValue} 
        setEditingId={setEditingId} 
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
          setEditingId(row.original.id);
          setEditingValue(value)
        }}
      >
        {editingValue ? editingValue : value}
      </strong>)
  }

  const TableSelectCell = (value:string, row:any, index:number, nameItem:string ) => {
    const oldValue = value
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState(row.values[nameItem]);
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    React.useEffect(() => {
      console.log('editingId: ', editingId)
      console.log('editingValue: ', editingValue)
      console.log('sb: ', sb)

    }, [editingId, editingValue]);

    // Para dar el foco al select si éste se renderiza
    React.useEffect(() => {
      if (editingId === row.original.id && selectRef.current) {
        selectRef.current.focus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingId]);

    if ((editingId) === row.original.id) {
      return <Select 
      row={row} 
      optionRow={optionRow}
      nameItem={nameItem}
      index={0}
      selectRef={selectRef} 
      editingValue={editingValue} 
      setEditingValue={setEditingValue} 
      setEditingId={setEditingId} 
      showSaveBtns={showSaveBtns} 
      setShowSaveBtns={setShowSaveBtns} 
      oldValue={oldValue} 
      sb={sb} 
      setSb={setSb}
    />
    }
    //let reg = optionRow[index].map((item:ObjType) => (item.id = value))
    // let v:ObjType[]
    // while (true || isError) {
    //   if (!isLoading) {
    //     v = optionRow[index].find((item:ObjType)=>item.id === String(row.values.id))
    //     console.log('v=', v)
    //     break
    //   }}
      
    //console.log('reg=',reg)
    
    return (
      <strong 
        key={`strong${row.values.id}`}
        className={'cursor-pointer'}
        onClick={(e) => {
          setEditingId(row.values.id);
          //setEditingValue(v[nameItem])
        }}
      >
        {editingValue ? editingValue : value} {/*optionRow[index][0][nameItem]}*/}
      </strong>)
  }
  /********************* END HANDLER ELEMENTS TYPE ********************/
  
  /********************** HANDLER ACTIONS BUTTONS *********************/
  const handleDelete = (value:any) => {
    //alert(`Ha pulsado el boton Delete con valores ${JSON.stringify(value)}`)
    Alert.onDelete(()=>deleteObject(value, collect), collect)
  }
  /******************** END HANDLER ACTIONS BUTTONS *******************/

  var FieldTypes = [{nombre: 'opcion1'}, {nombre: 'opcion2'},{nombre: 'opcion3'},{nombre: 'opcion4'}];

  console.log('Lista de rows para el select: ',optionRow)
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
                Header: 'Fam',
                accessor: 'idFam',
                //Cell: ()=> <Select  nameItem={'nombre'} rows={optionRow} index={0}/>             
                //Cell: () =>  !isLoading  ? <Select  nameItem={'nombre'} rows={optionRow} index={0}/> : <div>Loading...</div>
                Cell: ({ value, row }) => {
                  if (isLoading) {
                    return <div>Loading...</div>
                  } else {
                    let v:ObjType[]
                    v = optionRow[0].find((item:ObjType)=>item.id === String(row.values.id))
                    console.log('v=', v)
                    return TableSelectCell(
                      value, 
                      row, 
                      0,
                      'nombre')
                  }
                }
              },             
              {
                Header:"Id",
                Footer:"Id",
                accessor:"id"
              },
              // {
              //   Header:"Familia",
              //   Footer:"Familia",
              //   accessor:"idFam"
              // },
              {
                Header:"Subfamilia",
                Footer:"Subfamilia",
                accessor:"idSubFam",
              },
              {
                Header:"Articulo",
                Footer:"Articulo",
                accessor:"nombre",
                Cell: ({ value, row })=>TableInputCell(value, row),
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
                      <Trash/>
                    </button>
                    {(sb.includes(String(cell.row.original.id))) && 
                      <button 
                        key={`btnSave${cell.row.original.id}`}
                        className='btnTailWind bg-sky-600 hover:bg-sky-800 hover:text-white'  
                        value={cell.row.original.id} 
                        onClick={()=>alert(`Has pulsado el boton grabar de la linea ${cell.row.id} con id ${cell.row.original.id}`)}
                      >
                        <Save/>
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