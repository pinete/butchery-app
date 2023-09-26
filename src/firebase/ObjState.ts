import React from 'react';
import { getSimplifiedObjects, getSimplifiedObjectsOrderBy } from "./ObjController"
import { ObjListener } from "./ObjListener"

/**
 * Devuelve un useState array con los objetos de la coleccion firebase dada.
 * El array se actualiza con cada cambio en la coleccion de firebase 
 * @param collect Coleccion firebase a capturar
 * @param orderBy Opcional. Key por la que ordenar
 * @returns obj<[{}]>, setObj<f()>, objLoaded<boolean> e isChanged<boolean> de useState
 */
const ObjState = (collect:string, orderBy?:string) => {
  const {isCollectChanged, setIsCollectChanged} = ObjListener(collect)
  const [objLoaded, setObjLoaded] = React.useState<boolean>(false)
  const [obj, setObj] = React.useState([{}])

  const capturaObjeto = (setObj:React.Dispatch<React.SetStateAction<{}[]>>)=>{
    if (orderBy) getSimplifiedObjectsOrderBy(collect, orderBy)
      .then ((r) => { 
        setObj(r)
        setObjLoaded(true) 
      }) 
      .catch((e) => console.error(e))
      .finally(() => setIsCollectChanged(false))
    else getSimplifiedObjects(collect)
      .then ((r) => { 
        setObj(r)
        setObjLoaded(true) 
      }) 
      .catch((e) => console.error(e))
      .finally(() => setIsCollectChanged(false))
  }; 
  
  React.useEffect(() => {
    capturaObjeto(setObj)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollectChanged, collect])

  return {obj, setObj, objLoaded, isCollectChanged}
}
export default ObjState