import { useState } from "react";
import { useDispatch } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";
import { Box, Tabs, Tab, Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import StoreInfo from "./StoreInfo";

const SettingsModal = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setApps(null));
  };
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true}
    >
      <ModalBox sx={{ width: 800 }}>
        <ModalHeader handleClose={handleClose} />
        <Box sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Store Info" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2, display: "flex" }}>
          <StoreInfo />
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default SettingsModal;
