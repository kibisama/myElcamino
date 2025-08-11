import { useState } from "react";
import { Box } from "@mui/material";
import SideMenu from "./SideMenu";

const style = {
  container: {
    px: 2,
  },
  sideMenu: {
    float: "left",
    height: "100vh",
    borderRight: "1px solid",
    borderColor: "divider",
    overflow: "scroll",
  },
  content: {
    overflow: "auto",
  },
};
const DeliveryLog = () => {
  //   const { list } = useSelector((state) => state.delivery);
  return (
    <Box sx={style.container}>
      <Box sx={style.sideMenu}>
        <SideMenu />
      </Box>
      <Box sx={style.content}>{Array(30).fill("test")}</Box>
    </Box>
  );
};

export default DeliveryLog;
