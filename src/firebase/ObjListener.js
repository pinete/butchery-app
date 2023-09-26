import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./index";

export function ObjListener(collect) {
  /*
  // Este código diferencia el tipo de cambio
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collect), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Documento añadido
          const nuevoDocumento = change.doc.data();
          // Realizar resto de acciones necesarias
        }
        if (change.type === "modified") {
          // Documento modificado
          const documentoModificado = change.doc.data();
          // Realizar resto de acciones necesarias
        }
        if (change.type === "removed") {
          // Documento eliminado
          const documentoEliminado = change.doc.data();
          // Realizar resto de acciones necesarias
        }
      });
    });

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      unsubscribe();
    };
  // }, []);
*/

  // Para comprobar si hay que volver a leer la DB por producirse un cambio
  const [isCollectChanged, setIsCollectChanged] = useState(false)
  useEffect(() => {
    const unlistening = onSnapshot(collection(db, collect), (snapshot) => {
      snapshot.docChanges().forEach(() => setIsCollectChanged(true));
    });

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      unlistening();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isCollectChanged, setIsCollectChanged}
}
