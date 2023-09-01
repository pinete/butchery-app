import React, { useRef } from 'react';
import { ref, uploadBytes} from "firebase/storage";
import { storage } from './index'
import MotionButton from '../components/01_atomos/MotionButton';

type PropsType = {
  ruta: string;
  setImageName: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImage = ({ ruta, setImageName }: PropsType): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageName(e.target.files[0].name);
    }
  }; 

  const handleUpload = () => {

    if (inputRef.current?.files) {
      const selectedFile = inputRef.current.files[0];
      const storageRef = ref(storage, `${ruta}/${selectedFile.name}`);
      try {
        uploadBytes(storageRef, selectedFile);
        console.log('Imagen subida con éxito');
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  return (
    <div className='flex align-middle justify-items-center'>
      <input 
        type="file" 
        ref={inputRef} 
        accept={`${ruta}/*`} 
        onChange={handleImageChange} 
      />
      <MotionButton 
        textColorHover='white'
        bg='sky-400'
        bgHover='sky-600'
        bgDark='sky-600'
        bgHoverDark='sky-800'
        textButton='Guardar' 
        onclick={handleUpload}
      />
    </div>
  );
};

export default UploadImage;