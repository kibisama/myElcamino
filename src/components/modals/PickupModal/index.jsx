import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";

import { Box, Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import NumberInput from "../../customs/NumberInput";
import SignatureBox from "./SignatureBox";
import ItemsList from "./ItemsList";

import { addPickupItems } from "../../../lib/api/client";

import { io } from "socket.io-client";
const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const style = {
  content: {
    p: 2,
    display: "flex",
    justifyContent: "space-between",
  },
};

export default function PcikupModal() {
  if (!socket) {
    socket = io(URL);
  }
  const dispatch = useDispatch();
  const { apps } = useSelector((state) => state.global);
  const handleClose = () => {
    dispatch(setApps(null));
  };

  const [rxNumber, setRxNumber] = useState("");

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={apps}
    >
      <ModalBox sx={{ width: 800 }}>
        <ModalHeader handleClose={handleClose} />
        <Box sx={style.content}>
          <Box>
            <NumberInput
              label="Rx Number"
              value={rxNumber}
              onChange={(e) => {
                setRxNumber(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  try {
                    await addPickupItems({ item: rxNumber });
                    setRxNumber("");
                  } catch (e) {
                    console.log(e);
                  }
                }
              }}
            />
          </Box>
          <SignatureBox socket={socket} />
          <ItemsList socket={socket} />
        </Box>
      </ModalBox>
    </Modal>
  );
}
