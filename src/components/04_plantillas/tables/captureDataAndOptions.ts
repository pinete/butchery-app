import React from "react";

import ObjState from "../../../firebase/ObjState";

import { getSimplifiedObjects, getSimplifiedObjectsOrderBy } from "../../../firebase/ObjController";
import { ObjListener } from "../../../firebase/ObjListener";


type Props = { 
  collect: string 
  optionCollect:string[],
};

type ObjType = {
  [key:string]:any
}

/**
 * Captura los datos de la coleccion y los datos de las opciones de los select
 * @param collect Nombre de la coleccion de la tabla
 * @param optionCollect Array con los nombres de las colecciones que se usaran como opciones en los selects
 * @return  data -> datos de la tabla | 
 *          optionRows -> Array con los objetos a usar en los select | 
 *          objLoaded -> Booleano que indica si data esta completado | 
 *          isCollectChanged -> Booleano que indica si la coleccion ha cambiado | 
 *          isOptionLoading -> Booleano que indica si optionRows está completado
 */
export default function CaptureDataAndOptions({ collect, optionCollect=[] }: Props) {

  // *** Para el caso de los tipo Select, captamos las rows para las options de los Selects según optionCollect ***
  const [isOptionLoading, setisOptionLoading] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);
  const [objLoaded, setObjLoaded] = React.useState<boolean>(false);
  const {isCollectChanged, setIsCollectChanged} = ObjListener(collect) // Escucha los cambios de la coleccion en DB
  const [optionRows, setOptionRows] = React.useState<Record<string, ObjType[]>>()

  // Creamos el objeto con las colecciones que se usarán como opciones de los Selects en esta tabla
  React.useEffect(() => {
    // setOptionRows(undefined);
    // setisOptionLoading(true);
    Promise.all(optionCollect.map(captureOptions))
      .then((results: ObjType[][]) => {
        const optionsObj: Record<string, ObjType[]> = {};
        optionCollect.forEach((collect, index) => {
          optionsObj[collect] = results[index];
        });
        setOptionRows(optionsObj);
        setisOptionLoading(false);
        
      })
      .catch((error) => {
        setOptionRows(undefined);
        setisOptionLoading(false);
        console.error(error);
      }); 
    // return () => {
    //   setOptionRows(undefined);
    //   setisOptionLoading(true);
    // }    
  }, [optionCollect]);

  const captureOptions = async (collect: string): Promise<ObjType[]> => {
    
    try {
      //return await getSimplifiedObjects(collect);
      return await getSimplifiedObjectsOrderBy(collect, 'nombre'); // TODO: ordena por la id guardada en el campo nombre.
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  // **************************************** Fin caso de los tipo Select ********************************************

  // ****************************************      Capturamos DATA        ********************************************
  React.useEffect(() => {
    
    setObjLoaded(false)
    const captureData = async () => {
      const result = await getSimplifiedObjectsOrderBy(collect,'nombre')
      setObjLoaded(true);
      setData(result);
      //setIsCollectChanged(false)
    };  
    captureData().then(()=> setIsCollectChanged(false))
    .catch((error) => {console.error(error)})
    return () => {
      setData([]);
      setObjLoaded(false);
    }
  }, [collect, isCollectChanged, setIsCollectChanged]);
  
  // const { obj, objLoaded, isCollectChanged } = ObjState(collect,'nombre');
  // setData(obj)
  // ****************************************    FIN Capturamos DATA      ********************************************

  return {data, optionRows, objLoaded, isCollectChanged, isOptionLoading}
}