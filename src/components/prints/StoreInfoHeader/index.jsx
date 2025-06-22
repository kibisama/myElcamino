import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSettings } from "../../../lib/api/client";

const style = {
  container: { pt: 2, pl: 2 },
  storeName: {
    fontSize: 18,
    fontWeight: 600,
  },
};

export default function StoreInfoHeader() {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    async function get() {
      try {
        const { data } = await getSettings();
        if (data) {
          const { results } = data;
          setSettings(results);
        }
      } catch (e) {
        setSettings({});
        console.log(e);
      }
    }
    get();
  }, []);

  return (
    <Box sx={style.container}>
      <Typography sx={style.storeName}>{settings.storeName}</Typography>
      <Typography>{settings.storeAddress}</Typography>
      <Typography>
        {settings.storeCity +
          ", " +
          settings.storeState +
          " " +
          settings.storeZip}
      </Typography>
      <Typography>{"Phone " + settings.storePhone}</Typography>
      <Typography>{"Fax " + settings.storeFax}</Typography>
      <Typography>{settings.storeEmail}</Typography>
    </Box>
  );
}
