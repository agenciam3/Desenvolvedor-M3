import axios from "axios";

export const api = axios.create({
  baseURL: process.env.SERVER_API || "http://localhost:5000",
});
