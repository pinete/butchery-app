import React from "react";
import ObjState from "../../../firebase/ObjState";
import GenericTable from "../../03_organismos/GenericTable";


const TableObj = (
  collect:string, 
  textButton:string='',
  title?:string, 
  arrayFields?:string[],
  renderHeadButtons?:()=>React.ReactNode,
  renderLineButtons?:()=>React.ReactNode,
) => {
  let {obj} = ObjState(collect)
 
  return (
 
            <GenericTable 
              data={obj} 
              fieldsToShow = {arrayFields} 
              renderHeadButtons = {renderHeadButtons}
              renderLineButtons = {renderLineButtons}
            />

  )
}
export default TableObj
