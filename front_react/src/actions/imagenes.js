//Este es el creador de acciones relacionadas con imagenes.
//Vamos a importar ImagenDataServicepara realizar solicitudes HTTP asincrónicas 
//con un disparador dispatchen el resultado.
//EJ: createImagen()
//       llama al ImagenDataService.create()
//        envío CREATE_IMAGEN

//Algunos creadores de acciones devuelven un Promise para 
//los componentes que los utilizan.

import {
    CREATE_IMAGEN,
    RETRIEVE_IMAGENES,
    UPDATE_IMAGEN,
    DELETE_IMAGEN,
    DELETE_ALL_IMAGENES
  } from "./types";
  
  import ImagenDataService from "../services/imagen.service";
  
  export const createImagen = (title, description) => async (dispatch) => {
    try {
      const res = await ImagenDataService.create({ title, description });
  
      dispatch({
        type: CREATE_IMAGEN,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveImagenes = () => async (dispatch) => {
    try {
      const res = await ImagenDataService.getAll();
  
      dispatch({
        type: RETRIEVE_IMAGENES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateImagen = (id, data) => async (dispatch) => {
    try {
      const res = await ImagenDataService.update(id, data);
  
      dispatch({
        type: UPDATE_IMAGEN,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteImagen = (id) => async (dispatch) => {
    try {
      await ImagenDataService.delete(id);
  
      dispatch({
        type: DELETE_IMAGEN,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllImagenes = () => async (dispatch) => {
    try {
      const res = await ImagenDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_IMAGENES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findImagenesByTitle = (title) => async (dispatch) => {
    try {
      const res = await ImagenDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_IMAGENES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };