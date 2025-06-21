import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { postSettings } from "../../../../lib/api/client";

const style = {};

const StoreInfo = ({ settings }) => {
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
        px: 2,
        height: 500,
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
      <Box sx={{}}>
        <TextField
          onChange={(e) => setCity(e.target.value)}
          value={city}
          label="City"
        />
        <TextField
          onChange={(e) => setState(e.target.value)}
          value={state}
          label="State"
        />
        <TextField
          onChange={(e) => setZip(e.target.value)}
          value={zip}
          label="Zip Code"
        />
      </Box>
      <Box>
        <TextField
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          label="Phone"
        />
        <TextField
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
      <Box>
        <TextField
          onChange={(e) => setManagerLN(e.target.value)}
          value={managerLN}
          label="Last Name"
        />
        <TextField
          onChange={(e) => setManagerFN(e.target.value)}
          value={managerFN}
          label="First Name"
        />
      </Box>
      <Box>
        <Button variant="outlined" children="RESET" onClick={onGetSettings} />
        <Button
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
