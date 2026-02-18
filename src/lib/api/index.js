import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

export const post = (url, { arg }) => client.post(url, arg);
export const get = (url) => client.get(url);
