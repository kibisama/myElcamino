import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import PageContainer from "../PageContainer";
import StoreInfo from "./StoreInfo";

export default function Settings() {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <PageContainer title="Settings">
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab value={0} label="Store Info" />
            <Tab value={1} label="Import csv" />
          </Tabs>
        </Box>
        {value === 0 && <StoreInfo />}
      </Box>
    </PageContainer>
  );
}
