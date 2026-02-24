import axios from "axios";

export const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;
client.interceptors.response.use((res) => res.data);

export const post = (url, { arg }) => client.post(url, arg);
export const get = (url) => client.get(url);
