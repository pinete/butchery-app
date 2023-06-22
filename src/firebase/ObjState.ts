import React from 'react';
import { getSimplifiedObjects } from "./ObjController"
import { ObjListener } from "./ObjListener"

// export type ObjProps<T> = {
//   data: T[];
// }
/**
 * Devuelve un useState array con los objetos de la coleccion firebase dada.
 * El array se actualiza con cada cambio en la coleccion de firebase 
 * @param collect Coleccion firebase a capturar
 * @returns obj y setObj de useState
 */
const ObjState = (collect:string, id?:string) => {
  let {isChanged, setIsChanged} = ObjListener(collect)
  const [obj, setObj] = React.useState([{}])

  const capturaObjeto = (setObj:React.Dispatch<React.SetStateAction<{}[]>>)=>{
    getSimplifiedObjects(collect)
      .then ((r) => { 
        setObj(r) 
        console.log(r)
      }) 
      .catch((e) => console.error(e))
      .finally(() => setIsChanged(false))
  }

  React.useEffect(() => {
    capturaObjeto(setObj)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged])

  return {obj, setObj}
}
export default ObjState