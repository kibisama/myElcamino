import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";

import { Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";

import { io } from "socket.io-client";
import { getPickupItems } from "../../../lib/api/client";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
const socket = io(URL);

export default function PcikupModal() {
  const dispatch = useDispatch();
  const { apps } = useSelector((state) => state.global);
  const handleClose = () => {
    dispatch(setApps(null));
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    (async function () {
      await getPickupItems();
    })();
    function onGet(data) {
      setItems(data);
    }
    socket.on("get", onGet);
    return () => {
      socket.off("get", onGet);
    };
  }, []);
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={apps}
    >
      <ModalBox sx={{ width: 1080 }}>
        <ModalHeader handleClose={handleClose} />
        {items}
      </ModalBox>
    </Modal>
  );
}
