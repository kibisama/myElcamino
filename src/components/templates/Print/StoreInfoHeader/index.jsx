import React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getSettings } from "../../../../lib/api/client";

export default function StoreInfoHeader({
  styles = {},
  noFax = false,
  noEmail = false,
}) {
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
  const _styles = {
    name: {
      fontSize: 18,
      fontWeight: 600,
      ...styles.name,
    },
  };

  return (
    <div>
      {settings ? (
        <React.Fragment>
          <Typography sx={_styles.name}>{settings.storeName}</Typography>
          <Typography>{settings.storeAddress}</Typography>
          <Typography>
            {settings.storeCity +
              ", " +
              settings.storeState +
              " " +
              settings.storeZip}
          </Typography>
          <Typography>
            {noFax || !settings.storeFax ? "Phone " : "" + settings.storePhone}
          </Typography>
          {!noFax && settings.storeFax && (
            <Typography>{"Fax " + settings.storeFax}</Typography>
          )}
          {!noEmail && settings.storeEmail && (
            <Typography>{settings.storeEmail}</Typography>
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
}
