import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import 'firebase/storage';
import { useState } from "react";


const useImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('');

    /**
   * Guarda en el storage el fichero dado en la ruta dada
   * @param ruta 
   * @param imageFile 
   * @returns 
   */
  const putImage = (ruta:string, imageFile:File ) => { 
    let response:string='No se ha obtenido imagen a subir'
    if (imageFile) {
      const storageRef = ref(storage, `${ruta}/${imageFile.name}`);
      uploadBytes (storageRef, imageFile)     
        .then(() => {
          response=`Imagen ${imageFile.name} subida con éxito`;
        })
        .catch((error:any) => {
          response=`Error al subir la imagen: ${error}`;
        }
      );
    }  
    return response
  };

  /**
   * Obtiene un fichero del storage que coincide con la ruta y el nombre dados
   * @param ruta String con la ruta al archivo
   * @param storageImgName String con el nombre del archivo
   * @returns url al archivo
   */
  const getImage = (ruta:string, storageImgName:string) => {
    
    const storageRef = ref(storage, `${ruta}/${storageImgName}`);
    if (storageImgName ) {
      // Obtener URL de descarga del archivo
      getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        alert(`Se ha producido un error: ${error}`)
      });
    }
    return imageUrl
  }
  return {getImage, putImage}
}

export default useImage