import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSettings } from "../../../../lib/api/client";

export default function StoreInfoHeader() {
  const [settings, setSettings] = useState(null);
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
    <Box>
      {settings ? (
        <Box sx={{ pt: 2, pl: 2 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {settings.storeName}
          </Typography>
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
      ) : null}
    </Box>
  );
}
