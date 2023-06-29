import { getSimplifiedObjects } from "../../firebase/ObjController";
import useList, {UseListMethods} from "../../hooks/useList";
import MotionButton from '../01_atomos/MotionButton';

interface FamData {
  pos: number;
  id: string;
  img: string;
  nombre: string
}

const RenderFam:React.FC = () => {
  const famList = useList(async () => {
    //const response = await getSimplifiedObjects<FamData>('families');
    const response = await getSimplifiedObjects('families');
    await getSimplifiedObjects('families')
    type ObjetoFirestoreType = typeof response;
    return response as ObjetoFirestoreType;
  })
   
  return (
    <div className='flex'>
      {famList.value.map((fam:any , index:number) => {

        return (
          <>
            <MotionButton key={`button${index}`} textButton={fam.nombre} />
          </>
        )
      })}
    </div>
  )
}
export default RenderFam
