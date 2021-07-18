//En este paso, crearemos un servicio que utiliza el objeto axios anterior 
//para enviar solicitudes HTTP o realizar llamadas a la API.
import http from "../http-common";

class ImagenDataService {
  getAll() {
    return http.get("/imagen");
  }

  get(id) {
    return http.get(`/imagen/${id}`);
  }

  create(data) {
    return http.post("/imagen", data);
  }

  update(id, data) {
    return http.put(`/imagen/${id}`, data);
  }

  delete(id) {
    return http.delete(`/imagen/${id}`);
  }

  deleteAll() {
    return http.delete(`/imagen`);
  }

  findByTitle(title) {
    return http.get(`/imagen?title=${title}`);
  }
}

export default new ImagenDataService();