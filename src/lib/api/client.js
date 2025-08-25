import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

export const scanInv = (body) => client.post("inv/scan", body);
export const getDailyOrder = (date) => client.get(`inv/dailyOrder/${date}`);

export const postPickup = (body) => client.post("apps/pickup", body);

export const findDeliveryLog = (body) => client.post("apps/pickup/find", body);
export const getPickupProof = (body) => client.post("apps/pickup/proof", body);
//

export const getSettings = () => client.get("apps/settings");
export const postSettings = (body) => client.post("apps/settings", body);

export const checkDRxCSV = (body) =>
  client.post("apps/upload/checkDRxCSV", body);
export const uploadDRxCSV = (body) =>
  client.post("apps/upload/uploadDRxCSV", body);

export const getDeliveryGroups = () => client.get("apps/delivery/group");
