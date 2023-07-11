import {useEffect, useState} from 'react'
import { getSimplifiedObjects } from "../../firebase/ObjController";
import useList from "../../hooks/useList";
import MotionButton from '../01_atomos/MotionButton';

type SubfamProps = {pos:number, id:string, idSubfam:string, nombre:string, img:string}

const RenderSubfam:React.FC = () => {
  const subfamList = useList(async () => {
    const response = await getSimplifiedObjects('subfamilies');
    return response 
  })
  
  const [selectedSubfam, setSelectedSubfam] = useState(`button-1`)
  const [idFam, setIdFam] = useState('')
  const [idSubfam, setIdSubfam] = useState('')
  sessionStorage.setItem('idSubfam',idSubfam)
  
  useEffect(() => {
    const fam=JSON.parse(sessionStorage.getItem('idFam')!)
    setIdFam(fam)
  }, [idFam])
  

  const handlerFamButton = (index:number, subfam?:SubfamProps) => {
    setSelectedSubfam(`button${index}`)
    subfam ? setIdSubfam(subfam.id) : setIdSubfam('')
    sessionStorage.setItem('idSubfam',idSubfam)
  }
  //console.log('id de subfamilia: ', idSubfam) 
  return (<>
  
    <div className='b-3 w-96 text-center'>
      <h1 className='mt-2 text-3xl text-sky-700 font-semibold dark:text-sky-300'>Subfamilias</h1>
    </div>
    <div className='flex p-1 border object-cover h-15 w-96'>
      
      <MotionButton key={`button-1`} textButton='Todos' onclick={()=>{handlerFamButton(-1)}} adjunctClass={selectedSubfam === 'button-1' ? 'bg-stone-600 text-white':undefined}/>
      {subfamList.value.map((fam:SubfamProps , index:number) => {
        return (
          <>
            <MotionButton key={`button${index}`} onclick={()=>{handlerFamButton(index, fam)}} adjunctClass={selectedSubfam === `button${index}` ? 'bg-stone-600 text-white':undefined} textButton={fam.nombre} />
          </>
        )
      })}
    </div>
    </>
  )
}
export default RenderSubfam
