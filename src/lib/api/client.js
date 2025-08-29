import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

const generateQuery = (q) =>
  Object.keys(q)
    .map((v) => q[v] && `${v}=${q[v]}`)
    .join("&");

export const scanInv = (body) => client.post("inv/scan", body);
export const getDailyOrder = (date) => client.get(`inv/dailyOrder/${date}`);

export const postPickup = (body) => client.post("apps/pickup", body);
export const searchPickup = (q) =>
  client.get(`apps/pickup/search?${generateQuery(q)}`);
export const getPickupReport = ({ _id, rxNumber }) =>
  client.get(`apps/pickup/report/${_id}/${rxNumber}`);
//
export const getSettings = () => client.get("apps/settings");

export const postSettings = (body) => client.post("apps/settings", body);

export const checkDRxCSV = (body) =>
  client.post("apps/upload/checkDRxCSV", body);
export const uploadDRxCSV = (body) =>
  client.post("apps/upload/uploadDRxCSV", body);

export const getDeliveryGroups = () => client.get("apps/delivery/group");
