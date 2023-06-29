import { useState } from 'react';
import { ref, getDownloadURL} from "firebase/storage";
import { storage } from '../../firebase/index'
import 'firebase/storage';


const DownloadImage = (
  ruta:string, 
  storageImgName:string, 
  //image:string, 
  //setImage:React.Dispatch<React.SetStateAction<string>>, 
  imgWidth = '5%',
  imgHeight='5%'
):JSX.Element => {

  const [imageName, setImageName] = useState<string>('');

  const storageRef = ref(storage, `${ruta}/${storageImgName}`);
  console.log ('storage: ', storage)
  

  if (storageImgName ) {
    // Obtener URL de descarga del archivo
    getDownloadURL(storageRef)
    .then((url) => {
      setImageName(url);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  console.log('Imagen: ',imageName)
  return (
    <div className='object-scale-down inline-grid' style={{width:imgWidth, height:imgHeight}}>
      <img 
        key= {`img ${storageImgName}`} 
        
        alt={`Imagen a mostrar: ${storageImgName}`}
        src={imageName}
      />
    </div>
  );
};

export default DownloadImage;