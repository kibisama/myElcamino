import axios from "axios";

const client = axios.create();
client.defaults.baseURL = "http://localhost:3001";

export const scanInv = (body) => client.post("/inv/scan", body);
export const getDailyOrder = (date) => client.get(`/inv/dailyOrder/${date}`);
