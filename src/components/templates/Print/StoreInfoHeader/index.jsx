import React from "react";
import { Box, Typography } from "@mui/material";
import { get } from "../../../../lib/api";
import Logo from "../../../svg/Logo";
import useSWR from "swr";

const sx = {
  fontSize: 11,
  fontWeight: 600,
  lineHeight: "11px",
};

export default function StoreInfoHeader() {
  const { data: settings } = useSWR("/apps/settings", get);
  if (!settings) return;
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
          <Logo height={55} />
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
