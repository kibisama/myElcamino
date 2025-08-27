import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AppContainer from "../AppContainer";
import SignatureBox from "./SignatureBox";
import ItemsList from "./ItemsList";
import RelationBox from "./RelationBox";
import Clock from "./Clock";
import { postPickup } from "../../../../../lib/api/client";
import { io } from "socket.io-client";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { useDebouncedCallback } from "use-debounce";
import RefreshIcon from "@mui/icons-material/Refresh";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      decimalScale={0}
      allowNegative={false}
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
});

export default function Pickup() {
  if (!socket) {
    socket = io(URL);
  } else {
    socket.connect();
  }

  const [state, setState] = useState("standby");
  const [rxNumber, setRxNumber] = useState("");
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  // const [error, setError] = useState("");

  const onComplete = async (barcode) => {
    if (document.activeElement.tagName !== "INPUT") {
      const rxNumber = barcode.match(/\d+/g);
      rxNumber &&
        socket.emit("items", {
          action: "push",
          item: rxNumber.join(""),
        });
    }
  };
  useScanDetection({ onComplete });

  useEffect(() => {
    function onState(data) {
      setState(data);
    }
    function onNotes(data) {
      setNotes(data);
    }
    function onDate(data) {
      setDate(data && dayjs(data));
    }
    // function onError(data) {
    //   setError(data);
    // }
    socket.on("state", onState);
    socket.on("notes", onNotes);
    socket.on("date", onDate);
    // socket.on("error", onError);
    return () => {
      socket.disconnect();
    };
  }, []);

  const disableSubmit = state !== "pre-submit";
  // const handleSnackbarClose = async () => {
  //   try {
  //     await getPickupData("state");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const debounced = useDebouncedCallback(
    () => socket.emit("notes", notes),
    500
  );

  return (
    <AppContainer>
      <Box
        sx={{
          height: 476,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 676,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              height: 420,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: 430,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                sx={{ width: 138 }}
                label="Rx Number"
                slotProps={{ input: { inputComponent: NumericFormatCustom } }}
                autoFocus
                value={rxNumber}
                onChange={(e) => setRxNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (rxNumber) {
                      socket.emit("items", { action: "push", item: rxNumber });
                      setRxNumber("");
                    }
                  }
                }}
              />
              <Box
                sx={{
                  width: 268,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={date}
                    sx={{ width: 220 }}
                    onChange={(date, context) => {
                      if (!context.validationError) {
                        socket.emit("date", date);
                      }
                    }}
                    label="Delivery Date"
                    slotProps={{
                      openPickerButton: {
                        sx: {
                          border: "none",
                          mr: -1,
                        },
                      },
                      popper: { className: "app-content" },
                      actionBar: { actions: ["clear", "accept"] },
                    }}
                  />
                </LocalizationProvider>
                <IconButton size="small" onClick={() => setDate(dayjs())}>
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                width: 520,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  border: "1px solid",
                  borderRadius: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                  width: 240,
                }}
              >
                <RelationBox socket={socket} />
              </Box>
              <TextField
                size=""
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  debounced();
                }}
                sx={{ width: 256 }}
                label="Notes"
                multiline
                rows={8}
              />
            </Box>
            <SignatureBox socket={socket} />
          </Box>
          <ItemsList
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
            height={393}
            socket={socket}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Clock />
          <Box
            sx={{
              width: 224,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{ width: 100 }}
              variant="outlined"
              disabled={!disableSubmit}
              onClick={() => socket.emit("reset")}
              children="RESET"
            />
            <Button
              sx={{ width: 100, color: "primary.main" }}
              variant="outlined"
              disabled={disableSubmit}
              onClick={async () => {
                try {
                  await postPickup({ notes });
                } catch (e) {
                  console.error(e);
                  // setState("error");
                }
              }}
              children="SUBMIT"
            />
          </Box>
        </Box>
      </Box>
      {/* <Snackbar
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
        <Alert sx={style.alert} onClose={handleSnackbarClose} severity="error">
          <AlertTitle>Error</AlertTitle>
        </Alert>
      </Snackbar> */}
    </AppContainer>
  );
}
