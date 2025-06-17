import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";
import { Alert, Box, Modal, Button, TextField, Snackbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import NumberInput from "../../customs/NumberInput";
import SignatureBox from "./SignatureBox";
import ItemsList from "./ItemsList";
import RelationBox from "./RelationBox";
import Clock from "./Clock";
import {
  getPickupData,
  addPickupItems,
  setPickupDate,
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
  const [date, setDate] = useState(undefined);
  const [notes, setNotes] = useState("");
  const [state, setState] = useState("standby");

  useEffect(() => {
    function onState(data) {
      setState(data);
      if (data === "submit") {
        setDate(undefined);
      }
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={date}
                  onChange={async (date) => {
                    try {
                      setDate(date);
                      await setPickupDate({ date });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  label="Delivery Date"
                />
              </LocalizationProvider>
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
            <Box sx={{ display: "flex" }}>
              <Clock />
              <Box>
                <Button
                  disabled={!disableSubmit}
                  onClick={async () => {
                    try {
                      setRxNumber("");
                      setDate(undefined);
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
              </Box>
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
        <Snackbar
          open={state === "submit"}
          autoHideDuration={5000}
          onClose={async () => {
            try {
              await getPickupData("state");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Alert
            onClose={async () => {
              try {
                await getPickupData("state");
              } catch (e) {
                console.log(e);
              }
            }}
            severity="success"
            variant="outlined"
          >
            Success!
          </Alert>
        </Snackbar>
        <Snackbar
          sx={{ backgroundColor: "primary.main" }}
          open={state === "error"}
          autoHideDuration={5000}
          message="Error"
        />
      </ModalBox>
    </Modal>
  );
}
