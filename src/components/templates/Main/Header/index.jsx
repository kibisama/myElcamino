import React from "react";
import { Box } from "@mui/material";
import Logo from "./Logo";
import Tools from "./Tools";

const style = {
  container: {
    width: "100%",
    p: 0.25,
    position: "sticky",
    top: 0,
    zIndex: 998,
    backgroundColor: "background.paper",
    borderBottom: "1px solid",
    borderColor: "divider",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    ml: 1,
  },
  tools: {
    mr: 1,
  },
};

const Header = () => {
  return (
    <Box sx={style.container}>
      <Box sx={style.logo}>
        <Logo />
      </Box>
      <Box sx={style.tools}>
        <Tools />
      </Box>
    </Box>
  );
};

export default Header;
