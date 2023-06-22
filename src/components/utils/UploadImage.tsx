import React, { useRef, useState } from 'react';
import { ref, uploadBytes} from "firebase/storage";
import { storage } from '../../firebase/index'
import 'firebase/storage';
//import DownloadImage from './DownloadImage';
import MotionButton from '../01_atomos/MotionButton';



const UploadImage = (ruta:string, setImageName:React.Dispatch<React.SetStateAction<string>>):JSX.Element => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  //const [imageName, setImageName] = useState<string>('')


  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      console.log('html input file es: ',e)
    }
  }; 

  const handleUpload = () => {

    if (imageFile && inputRef.current?.files) {
      const selectedFile = inputRef.current.files[0];
      console.log('Fichero seleccionado: ', selectedFile);
      const storageRef = ref(storage, `image/${imageFile.name}`);
      console.log(imageFile)
          setImageName(selectedFile.name)
          console.log(selectedFile)
      uploadBytes (storageRef, selectedFile)     
        .then(() => {
          console.log("Imagen subida con éxito");

        })
        .catch((error:any) => {
          console.error("Error al subir la imagen:", error);
        }
      );
    }
  };

  return (
    <div className='flex align-middle justify-items-center'>
      <input type="file" ref={inputRef} accept={`${ruta}/*`} onChange={handleImageChange} />
      <div >
        <MotionButton 
                textColorHover='white'
                bg='sky-400'
                bgHover='sky-600'
                bgDark='sky-600'
                bgHoverDark='sky-800'
                textButton='Guardar' 
                onclick={handleUpload}
                />
        {/* { DownloadImage (ruta, imageName) }  */}
      </div>
    </div>
  );
};

export default UploadImage;