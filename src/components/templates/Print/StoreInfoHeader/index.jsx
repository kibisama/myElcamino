import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSettings } from "../../../../lib/api/client";
import Logo from "../../../svg/Logo";

const sx = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.25,
};

export default function StoreInfoHeader() {
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
          <Logo height={48} />
          <div>
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
          </div>
        </React.Fragment>
      ) : null}
    </Box>
  );
}
