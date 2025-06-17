import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Toolbar from "./Toolbar";
import ListTable from "./ListTable";

const style = {
  container: {
    p: 2,
  },
  toolbar: {
    mb: 1,
  },
};

const DeliveryLog = () => {
  const { list } = useSelector((state) => state.delivery);
  return (
    <Box sx={style.container}>
      <Box sx={style.toolbar}>
        <Toolbar />
        <ListTable rows={list} />
      </Box>
    </Box>
  );
};

export default DeliveryLog;
