import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

export const scanInv = (body) => client.post("inv/scan", body);
export const getDailyOrder = (date) => client.get(`inv/dailyOrder/${date}`);

export const getPickupData = (type) => client.get(`apps/pickup/get/${type}`);
export const addPickupItems = (body) => client.post("apps/pickup/add", body);
export const removePickupItems = (body) =>
  client.post("apps/pickup/remove", body);
export const clearPickup = () => client.get("apps/pickup/clear");
export const clearPickupCanvas = () => client.get("apps/pickup/clear-canvas");
export const setPickupRelation = (body) =>
  client.post("apps/pickup/relation", body);
//
