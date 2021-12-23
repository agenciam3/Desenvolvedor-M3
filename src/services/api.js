import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:5000/products",
  });


export default api;