import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PageContainer from "../PageContainer";
import ImportDRx from "./ImportDRx";
import StoreInfo from "./StoreInfo";
import Users from "./Users";

export default function Settings() {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <PageContainer title="Settings">
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value={0} label="Import csv" />
            <Tab value={1} label="Store Info" />
            <Tab value={2} label="Client Users" />
          </Tabs>
        </Box>
        {value === 0 && <ImportDRx />}
        {value === 1 && <StoreInfo />}
        {value === 2 && <Users />}
      </Box>
    </PageContainer>
  );
}
