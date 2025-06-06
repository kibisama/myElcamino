import React from "react";
import { Box, Popover, Tabs, Tab, useTheme } from "@mui/material";
import CustomIconButton from "../../../../../customs/CustomIconButton";
import AppsIcon from "@mui/icons-material/Apps";
import CustomLgIconButton from "../../../../../customs/CustomLgIconButton";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import GestureIcon from "@mui/icons-material/Gesture";

import { setApps } from "../../../../../../reduxjs@toolkit/globalSlice";
import { useDispatch } from "react-redux";

const style = {
  tabs: {
    fontWeight: 600,
  },
  list: {
    p: 1,
    display: "flex",
  },
  appIcon: {
    fontSize: 48,
  },
};

const AppList = ({ value }) => {
  const dispatch = useDispatch();
  return (
    <div hidden={value !== 2}>
      <Box sx={style.list}>
        <CustomLgIconButton
          icon={<UploadFileRoundedIcon sx={style.appIcon} />}
          label="UPLOAD CSV"
        />
        <CustomLgIconButton
          icon={<GestureIcon sx={style.appIcon} />}
          onClick={() => {
            dispatch(setApps("PICKUP"));
          }}
          label="PICKUP"
        />
      </Box>
    </div>
  );
};

const ContentBox = () => {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => setValue(newValue);
  return (
    <Box>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab sx={style.tabs} value={1} label="Screens" />
        <Tab sx={style.tabs} value={2} label="Apps" />
      </Tabs>
      <AppList value={value} />
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
        <ContentBox />
      </Popover>
    </>
  );
};

export default Apps;
