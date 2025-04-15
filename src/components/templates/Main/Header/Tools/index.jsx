import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../../../../reduxjs@toolkit/globalSlice";
import { setOpen } from "../../../../../reduxjs@toolkit/scanSlice";
import { Box } from "@mui/material";
import CustomIconButton from "../../../../customs/CustomIconButton";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const style = {
  container: {
    width: 180,
    display: "flex",
    justifyContent: "space-between",
  },
};

const Tools = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.global);

  const handleQrCodeButton = React.useCallback(() => {
    dispatch(setOpen(true));
  }, [dispatch]);
  const handleDarkModeButton = React.useCallback(() => {
    dispatch(setDarkMode(!darkMode));
  }, [dispatch, darkMode]);

  return (
    <Box sx={style.container}>
      <CustomIconButton
        children={<QrCodeIcon />}
        onClick={handleQrCodeButton}
      />
      <CustomIconButton children={<AppsIcon />} />
      <CustomIconButton children={<NotificationsIcon />} />
      <CustomIconButton
        children={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        onClick={handleDarkModeButton}
      />
    </Box>
  );
};

export default Tools;
