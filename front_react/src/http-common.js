import axios from "axios";

export default axios.create({
    //puedo cambiar la baseURL segun como esta configurado el apiRest en el servidor
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});