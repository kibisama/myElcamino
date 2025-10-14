import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSettings } from "../../../../lib/api/client";
import Logo from "../../../svg/Logo";

export default function StoreInfoHeader({ fontFamily }) {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSettings();
        setSettings(data.data);
      } catch (e) {
        setSettings(null);
        console.error(e);
      }
    })();
  }, []);

  const sx = {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: "10px",
    fontFamily,
  };

  return (
    <Box
      sx={{
        width: 408,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      {settings ? (
        <React.Fragment>
          <Logo height={50} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={sx}>{settings.storeName}</Typography>
            <Typography sx={sx}>{settings.storeAddress}</Typography>
            <Typography sx={sx}>
              {settings.storeCity +
                ", " +
                settings.storeState +
                " " +
                settings.storeZip}
            </Typography>
            <Typography sx={sx}>{"Phone " + settings.storePhone}</Typography>
            {settings.storeFax && (
              <Typography sx={sx}>{"Fax " + settings.storeFax}</Typography>
            )}
          </Box>
        </React.Fragment>
      ) : null}
    </Box>
  );
}
