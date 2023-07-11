import {useState} from 'react'
import { getSimplifiedObjects } from "../../firebase/ObjController";
import useList from "../../hooks/useList";
import MotionButton from '../01_atomos/MotionButton';

type FamProps = {pos:number, id:string, nombre:string, img:string}

const RenderFam:React.FC = () => {
  const famList = useList(async () => {
    const response = await getSimplifiedObjects('families');
    return response 
  })
  
  const [selectedFam, setSelectedFam] = useState(`button-1`)
  const [idFam, setIdFam] = useState('')
  sessionStorage.setItem('idFam',idFam)

  const handlerFamButton = (index:number, fam?:FamProps) => {
    setSelectedFam(`button${index}`)
    fam ? setIdFam(fam.id) : setIdFam('')
    sessionStorage.setItem('idFam',idFam)
  }
  //console.log('id de familia: ', idFam) 
  return (<>
    <div className='b-3 w-96 text-center'>
      <h1 key='title' className='mt-2 text-3xl text-sky-700 font-semibold dark:text-sky-300'>Familias</h1>
    </div>
    <div className='flex p-1 border object-cover h-20 w-96'>
      
      <MotionButton key={`button-1`} textButton='Todos' onclick={()=>{handlerFamButton(-1)}} adjunctClass={selectedFam === 'button-1' ? 'bg-stone-600 text-white':undefined}/>
      {famList.value.map((fam:FamProps , index:number) => {
        return (
          <>
            <MotionButton key={`button${index}`} onclick={()=>{handlerFamButton(index, fam)}} adjunctClass={selectedFam === `button${index}` ? 'bg-stone-600 text-white':undefined} textButton={fam.nombre} />
          </>
        )
      })}
    </div>
    </>
  )
}
export default RenderFam
