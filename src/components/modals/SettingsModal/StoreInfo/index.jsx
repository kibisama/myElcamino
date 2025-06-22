import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { postSettings } from "../../../../lib/api/client";
import { getSettings } from "../../../../lib/api/client";

const StoreInfo = () => {
  const [settings, setSettings] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [managerLN, setManagerLN] = useState("");
  const [managerFN, setManagerFN] = useState("");
  async function get() {
    try {
      const { data } = await getSettings();
      if (data) {
        const { results } = data;
        setSettings(results);
      }
    } catch (e) {
      setSettings(null);
      console.log(e);
    }
  }
  useEffect(() => {
    get();
  }, []);
  const onGetSettings = () => {
    if (settings) {
      setName(settings.storeName);
      setAddress(settings.storeAddress);
      setCity(settings.storeCity);
      setState(settings.storeState);
      setZip(settings.storeZip);
      setPhone(settings.storePhone);
      setFax(settings.storeFax);
      setEmail(settings.storeEmail);
      setManagerLN(settings.storeManagerLN);
      setManagerFN(settings.storeManagerFN);
    }
  };
  useEffect(() => {
    onGetSettings();
  }, [settings]);

  const disableSave =
    name === settings?.storeName &&
    address === settings?.storeAddress &&
    city === settings?.storeCity &&
    state === settings?.storeState &&
    zip === settings?.storeZip &&
    phone === settings?.storePhone &&
    fax === settings?.storeFax &&
    email === settings?.storeEmail &&
    managerLN === settings?.storeManagerLN &&
    managerFN === settings?.storeManagerFN;
  return (
    <Box
      sx={{
        p: 2,
        height: 540,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TextField
        onChange={(e) => setName(e.target.value)}
        value={name}
        label="Store Name"
      />
      <TextField
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        label="Store Address"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: 355 }}
          onChange={(e) => setCity(e.target.value)}
          value={city}
          label="City"
        />
        <TextField
          sx={{ width: 150 }}
          onChange={(e) => setState(e.target.value)}
          value={state}
          label="State"
        />
        <TextField
          sx={{ width: 180 }}
          onChange={(e) => setZip(e.target.value)}
          value={zip}
          label="Zip Code"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: 355 }}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          label="Phone"
        />
        <TextField
          sx={{ width: 355 }}
          onChange={(e) => setFax(e.target.value)}
          value={fax}
          label="Fax"
        />
      </Box>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="E-mail"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: 355 }}
          onChange={(e) => setManagerLN(e.target.value)}
          value={managerLN}
          label="Last Name"
        />
        <TextField
          sx={{ width: 355 }}
          onChange={(e) => setManagerFN(e.target.value)}
          value={managerFN}
          label="First Name"
        />
      </Box>
      <Box
        sx={{
          alignSelf: "flex-end",
          width: 220,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{ width: 100 }}
          variant="outlined"
          children="RESET"
          onClick={onGetSettings}
        />
        <Button
          sx={{ width: 100 }}
          disabled={disableSave}
          variant="outlined"
          children="SAVE"
          onClick={async () => {
            try {
              await postSettings({
                storeName: name,
                storeAddress: address,
                storeCity: city,
                storeState: state,
                storeZip: zip,
                storePhone: phone,
                storeFax: fax,
                storeEmail: email,
                storeManagerLN: managerLN,
                storeManagerFN: managerFN,
              });
              await get();
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default StoreInfo;
