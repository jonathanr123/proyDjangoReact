//Habrá un reductor en la carpeta src / reducers , el reductor actualiza 
//el estado correspondiente a las acciones de Redux enviadas.

//El imagenesreductor actualizará el imagenesestado de la tienda Redux:

import {
    CREATE_IMAGEN,
    RETRIEVE_IMAGENES,
    UPDATE_IMAGEN,
    DELETE_IMAGEN,
    DELETE_ALL_IMAGENES,
  } from "../actions/types";
  
  const initialState = [];
  
  function imagenReducer(imagenes = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_IMAGEN:
        return [...imagenes, payload];
  
      case RETRIEVE_IMAGENES:
        return payload;
  
      case UPDATE_IMAGEN:
        return imagenes.map((imagen) => {
          if (imagen.id === payload.id) {
            return {
              ...imagen,
              ...payload,
            };
          } else {
            return imagen;
          }
        });
  
      case DELETE_IMAGEN:
        return imagenes.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_IMAGENES:
        return [];
  
      default:
        return imagenes;
    }
  };
  
  export default imagenReducer;