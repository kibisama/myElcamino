import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";

import { Box, Modal, Button, TextField } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import NumberInput from "../../customs/NumberInput";
import SignatureBox from "./SignatureBox";
import ItemsList from "./ItemsList";
import RelationBox from "./RelationBox";

import {
  getPickupData,
  addPickupItems,
  clearPickup,
  changePickupNotes,
  submitPickup,
} from "../../../lib/api/client";

import { io } from "socket.io-client";
const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const style = {
  content: {
    p: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: 520,
    height: 170,
    backgroundColor: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  relationBox: {
    mr: 1,
    border: "1px solid",
    borderRadius: 1,
    borderColor: "divider",
    display: "flex",
    justifyContent: "center",
    minWidth: 220,
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
  const [notes, setNotes] = useState("");
  const [state, setState] = useState("standby");

  useEffect(() => {
    function onState(data) {
      setState(data);
    }
    function onNotes(data) {
      setNotes(data);
    }
    (async function () {
      try {
        await getPickupData("state");
        await getPickupData("notes");
      } catch (e) {
        console.log(e);
      }
    })();
    socket.on("state", onState);
    socket.on("notes", onNotes);
    return () => {
      socket.off("state", onState);
    };
  }, []);
  const disableSubmit = state !== "pre-submit";

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={apps}
    >
      <ModalBox sx={{ width: 800, height: 600 }}>
        <ModalHeader handleClose={handleClose} />
        <Box sx={style.content}>
          <Box>
            <Box>
              <NumberInput
                sx={{ width: 140 }}
                label="Rx Number"
                value={rxNumber}
                onChange={(e) => {
                  setRxNumber(e.target.value);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    try {
                      if (rxNumber) {
                        await addPickupItems({ item: rxNumber });
                        setRxNumber("");
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              />
              <Button
                disabled={!disableSubmit}
                onClick={async () => {
                  try {
                    setRxNumber("");
                    await clearPickup();
                  } catch (e) {
                    console.log(e);
                  }
                }}
                children="RESET"
              />
              <Button
                disabled={disableSubmit}
                onClick={async () => {
                  try {
                    await submitPickup();
                  } catch (e) {
                    console.log(e);
                  }
                }}
                children="SUBMIT"
              />
              <Box sx={{ display: "flex" }}>
                <Box sx={style.relationBox}>
                  <RelationBox socket={socket} open={apps} />
                </Box>
                <TextField
                  value={notes}
                  onChange={async (e) => {
                    try {
                      await changePickupNotes({ notes: e.target.value });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  fullWidth
                  label="Notes"
                  multiline
                  rows={6}
                />
              </Box>
            </Box>
            <Box sx={style.signatureBox}>
              <SignatureBox socket={socket} open={apps} />
            </Box>
          </Box>
          <ItemsList
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
            socket={socket}
            open={apps}
          />
        </Box>
      </ModalBox>
    </Modal>
  );
}
