import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;
