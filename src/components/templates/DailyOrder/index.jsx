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

const DailyOrder = () => {
  const { list } = useSelector((state) => state.order);
  return (
    <Box sx={style.container}>
      <Box sx={style.toolbar}>
        <Toolbar />
      </Box>
      <ListTable rows={list} />
    </Box>
  );
};

export default DailyOrder;
