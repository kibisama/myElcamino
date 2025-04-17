import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

export const scanInv = (body) => client.post("inv/scan", body);
export const getDailyOrder = (date) => client.get(`inv/dailyOrder/${date}`);
