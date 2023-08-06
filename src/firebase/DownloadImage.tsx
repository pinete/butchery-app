import React, { useEffect, useRef } from 'react';
import { ref, getDownloadURL} from "firebase/storage";
import { storage } from './index'

type PropsType = {
  ruta:string 
  storageImgName:string 
  imgWidth?:string
  imgHeight?:string
}

const DownloadImage =  ({
  ruta, 
  storageImgName, 
  imgWidth = '5%',
  imgHeight='5%'
}:PropsType):JSX.Element => {

  console.log('ha entrado en DownloadImage')
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (storageImgName) {  
      const storageRef = ref(storage, `${ruta}/${storageImgName}`);
      getDownloadURL(storageRef)
      .then((url) => {
        imgRef.current?.setAttribute('src', url);
        //console.log(url)
      })
      .catch ((error) => {
        console.log(error);
      });
    }  
  }, [ruta, storageImgName]);

  return (
    <div className='flex justify-center'>
      <div className='object-scale-down inline-grid ' style={{width:imgWidth, height:imgHeight}}>
        <img
          ref={imgRef}
          key = {`img ${storageImgName}`} 
          alt = {storageImgName}
        />
      </div>
    </div>
  );
}

export default DownloadImage;