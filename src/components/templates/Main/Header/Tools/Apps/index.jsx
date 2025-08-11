import React from "react";
import { Box, Popover, Tabs, Tab, useTheme, Typography } from "@mui/material";
import CustomIconButton from "../../../../../customs/CustomIconButton";
import AppsIcon from "@mui/icons-material/Apps";
import CustomLgIconButton from "../../../../../customs/CustomLgIconButton";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import GestureIcon from "@mui/icons-material/Gesture";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  setApps,
  setScreen,
} from "../../../../../../reduxjs@toolkit/globalSlice";
import { useDispatch } from "react-redux";

const style = {
  tabs: {
    fontWeight: 600,
  },
  appList: {
    p: 2,
    display: "flex",
  },
  appIcon: {
    fontSize: 48,
  },
  screenList: {
    p: 2,
  },
  screenName: {
    color: "text.primary",
    ":hover": {
      color: "primary.main",
      cursor: "pointer",
      textDecoration: "underline",
      textDecorationColor: "primary.main",
    },
  },
};

const AppList = ({ value }) => {
  const dispatch = useDispatch();
  return (
    <div hidden={value !== 2}>
      <Box sx={style.appList}>
        <CustomLgIconButton
          icon={<UploadFileRoundedIcon sx={style.appIcon} />}
          onClick={() => {
            dispatch(setApps("UPLOAD_CSV"));
          }}
          label="UPLOAD CSV"
        />
        <CustomLgIconButton
          icon={<GestureIcon sx={style.appIcon} />}
          onClick={() => {
            dispatch(setApps("PICKUP"));
          }}
          label="PICKUP"
        />
        <CustomLgIconButton
          icon={<SettingsIcon sx={style.appIcon} />}
          onClick={() => {
            dispatch(setApps("SETTINGS"));
          }}
          label="SETTINGS"
        />
      </Box>
    </div>
  );
};

const ContentBox = ({ handleClose }) => {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => setValue(newValue);
  return (
    <Box>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab sx={style.tabs} value={1} label="Screen" />
        <Tab sx={style.tabs} value={2} label="Apps" />
      </Tabs>
      <AppList value={value} handleClose={handleClose} />
      <Screen value={value} handleClose={handleClose} />
    </Box>
  );
};

const Screen = ({ value, handleClose }) => {
  const dispatch = useDispatch();
  return (
    <Box sx={style.screenList} hidden={value !== 1}>
      <Typography
        sx={style.screenName}
        onClick={() => {
          dispatch(setScreen("DELIVERY"));
          handleClose();
        }}
      >
        Delivery
      </Typography>
      <Typography
        sx={style.screenName}
        onClick={() => {
          dispatch(setScreen("DAILY_ORDER"));
          handleClose();
        }}
      >
        Order report
      </Typography>
      <Typography
        sx={style.screenName}
        onClick={() => {
          dispatch(setScreen("PICKUP"));
          handleClose();
        }}
      >
        Pickup log
      </Typography>
      <Typography
        sx={style.screenName}
        onClick={() => {
          //
        }}
      >
        Inventories
      </Typography>
      <Typography
        sx={style.screenName}
        onClick={() => {
          //
        }}
      >
        Invoices
      </Typography>
      <Typography
        sx={style.screenName}
        onClick={() => {
          //
        }}
      >
        CII reconciliation
      </Typography>
    </Box>
  );
};

const Apps = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomIconButton onClick={handleClick} children={<AppsIcon />} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              height: 400,
              border: "1px solid",
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[400]
                  : theme.palette.grey[600],
            },
            elevation: 1,
          },
        }}
      >
        <ContentBox handleClose={handleClose} />
      </Popover>
    </>
  );
};

export default Apps;
