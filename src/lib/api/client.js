import axios from "axios";

const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_CLIENT_API_ADDRESS;

const generateQuery = (q) =>
  Object.keys(q)
    .map((v) => (q[v] ? `${v}=${q[v]}` : ""))
    .join("&");

/** DELIVERIES **/
export const getDeliveries = () => client.get("delivery");
export const getDeliverySessions = (section, date) =>
  client.get(`delivery/${section}/${date}`);
export const getDeliveryLogItems = (section, date, session) =>
  client.get(`delivery/${section}/${date}/${session}`);
export const getDeliveryReceipt = (section, date, session) =>
  client.get(`delivery/${section}/${date}/${session}/receipt`);
export const postDeliveryLog = (section) => client.post(`delivery/${section}`);
export const postDeliveryQR = (section, body) =>
  client.post(`delivery/${section}/qr`, body);
export const unsetDeliveryStation = (rxID) =>
  client.get(`delivery/unset/${rxID}`);
export const searchDeliveries = (rxNumber) =>
  client.get(`delivery/search/?rxNumber=${rxNumber}`);
/** INVENTORIES **/
export const getAutocompleteOptions = () => client.get("inv/alt");
export const getInventories = (q) => client.get(`inv/?${generateQuery(q)}`);
export const getInventoryUsage = (date) => client.get(`inv/usage/${date}`); //MMDDYYYY
/** dRx **/
export const getImportDRx = () => client.get("dRx/import");
export const postImportDRx = (body) => client.post("dRx/import", body);

/** APPS_SANINV **/
export const postScanInv = (body) => client.post("apps/scanInv", body);
/** APPS_PICKUP **/
export const postPickup = (body) => client.post("apps/pickup", body);
export const searchPickup = (q) =>
  client.get(`apps/pickup/search?${generateQuery(q)}`);
export const getPickupReport = ({ _id, rxNumber }) =>
  client.get(`apps/pickup/report/${_id}/${rxNumber}`);
/** APPS_SETTINGS **/
export const getSettings = () => client.get("apps/settings");
export const postSettings = (body) => client.post("apps/settings", body);

export const checkDRxCSV = (body) =>
  client.post("apps/upload/checkDRxCSV", body);
export const uploadDRxCSV = (body) =>
  client.post("apps/upload/uploadDRxCSV", body);
