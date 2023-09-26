import { useState } from "react";

export type pageObjProps = {
  page:number,
  per_page:number,
  total:number,
  total_pages:number,
  data:{}[]
}

export default function PagedObj(obj:{}[], per_page:number) {

  const objToReturn:pageObjProps[]=[]
  const total:number = obj.length;
  
  let total_pages:number = total / per_page
  if (!Number.isInteger(total_pages)) total_pages = Math.trunc((total / per_page)) + 1

  const objBase:pageObjProps = {
    page:1,
    per_page,
    total,
    total_pages,
    data:[]
  }


    console.log(`Obj:`, obj)
    for (let i=0; i<=obj.length-1; i++) {

      if ((i % per_page !== 0 || i === 0) ) {
        objBase.data.push(obj[i]) 
        //console.log(`objBase 1: ${JSON.stringify(objBase)}`)   
        alert(`objBase en 1: ${JSON.stringify(objBase)}`) 
      }
      else {
        objToReturn.push(...[objBase])     
        //alert(`objToReturn en 2: ${JSON.stringify(objToReturn)}`)
        objBase.page = objBase.page + 1
        objBase.data.splice(0, per_page)
        objBase.data.push(obj[i]) 
        //console.log(`objBase 2: ${JSON.stringify(objBase)}`)   
      } 
    }      

  console.log('objToReturn: ',objToReturn)
  return objToReturn 
} 