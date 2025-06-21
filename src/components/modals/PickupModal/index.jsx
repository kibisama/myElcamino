import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";
import {
  Alert,
  AlertTitle,
  Box,
  Modal,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
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
import useScanDetection from "../../../hooks/useScanDetection";
import { useDebouncedCallback } from "use-debounce";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const style = {
  content: {
    p: 2,
    display: "flex",
    flexDirection: "column",
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
    border: "1px solid",
    borderRadius: 1,
    borderColor: "divider",
    display: "flex",
    justifyContent: "center",
    minWidth: 220,
  },
  alert: {
    height: 200,
    width: 400,
  },
};

export default function PcikupModal() {
  if (!socket) {
    socket = io(URL);
  }
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setApps(null));
  };

  const [rxNumber, setRxNumber] = useState("");
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [state, setState] = useState("standby");

  const onComplete = async (barcode) => {
    if (document.activeElement.tagName !== "INPUT") {
      try {
        await addPickupItems({ item: barcode.match(/\d+/g).join("") });
      } catch (e) {
        setState("error");
      }
    }
  };
  useScanDetection({ onComplete });

  useEffect(() => {
    function onState(data) {
      setState(data);
      if (data === "submit") {
        setDate(null);
      }
    }
    function onNotes(data) {
      setNotes(data);
    }
    function onDate(data) {
      if (data) {
        setDate(dayjs(data));
      }
    }
    (async function () {
      try {
        await getPickupData("state");
        await getPickupData("notes");
        await getPickupData("items");
        await getPickupData("canvas");
        await getPickupData("relation");
        await getPickupData("date");
      } catch (e) {
        setState("error");
      }
    })();
    socket.on("state", onState);
    socket.on("notes", onNotes);
    socket.on("date", onDate);
    return () => {
      socket.off("state", onState);
      socket.off("notes", onNotes);
      socket.off("date", onDate);
    };
  }, []);
  const disableSubmit = state !== "pre-submit";
  const handleSnackbarClose = async () => {
    try {
      await getPickupData("state");
    } catch (e) {
      console.log(e);
    }
  };

  const debounced = useDebouncedCallback(async () => {
    try {
      await changePickupNotes({ notes });
    } catch (e) {
      setState("error");
    }
  }, 500);

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true}
    >
      <ModalBox sx={{ width: 700 }}>
        <ModalHeader handleClose={handleClose} />
        <Box sx={style.content}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                height: 416,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 410,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <NumberInput
                  autoFocus
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
                        setState("error");
                      }
                    }
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={date}
                    onChange={async (date, context) => {
                      try {
                        if (!context.validationError) {
                          setDate(date);
                          await setPickupDate({ date });
                        }
                      } catch (e) {
                        setState("error");
                      }
                    }}
                    label="Delivery Date"
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  width: 520,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={style.relationBox}>
                  <RelationBox socket={socket} />
                </Box>
                <TextField
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    debounced();
                  }}
                  sx={{ width: 285 }}
                  label="Notes"
                  multiline
                  rows={6}
                />
              </Box>
              <Box sx={style.signatureBox}>
                <SignatureBox socket={socket} />
              </Box>
            </Box>
            <Box sx={{ alignSelf: "flex-end" }}>
              <ItemsList
                sx={{
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
                socket={socket}
              />
            </Box>
          </Box>
          <Box
            sx={{ mt: 1.25, display: "flex", justifyContent: "space-between" }}
          >
            <Clock sx={{ alignSelf: "flex-end" }} />
            <Box
              sx={{
                width: 220,
                height: 40,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{ width: 100 }}
                variant="outlined"
                disabled={!disableSubmit}
                onClick={async () => {
                  try {
                    setRxNumber("");
                    setDate(null);
                    await clearPickup();
                  } catch (e) {
                    setState("error");
                  }
                }}
                children="RESET"
              />
              <Button
                sx={{ width: 100 }}
                variant="outlined"
                disabled={disableSubmit}
                onClick={async () => {
                  try {
                    await submitPickup({ notes });
                  } catch (e) {
                    setState("error");
                  }
                }}
                children="SUBMIT"
              />
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={state === "submit"}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert
            sx={style.alert}
            onClose={handleSnackbarClose}
            severity="success"
          >
            <AlertTitle>Success</AlertTitle>
          </Alert>
        </Snackbar>
        <Snackbar
          onClose={handleSnackbarClose}
          open={state === "error"}
          autoHideDuration={5000}
        >
          <Alert
            sx={style.alert}
            onClose={handleSnackbarClose}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
          </Alert>
        </Snackbar>
      </ModalBox>
    </Modal>
  );
}
