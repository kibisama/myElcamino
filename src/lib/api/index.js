import axios from "axios";

export const api = axios.create();
api.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/api";
api.interceptors.response.use((res) => res.data);

export const post = (url, { arg }) => api.post("/main" + url, arg);
export const get = (url) => api.get("/main" + url);

export const postClient = (url, { arg }) => api.post("/client" + url, arg);
export const getClient = (url) => api.get("/client" + url);
