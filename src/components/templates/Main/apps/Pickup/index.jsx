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
import { enqueueSnackbar, closeSnackbar } from "notistack";

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
  const [errors, setErrors] = useState([]);
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
    let key = null;
    socket.on("connect_error", (e) => {
      if (!key) {
        key = enqueueSnackbar("Unable to connect to the server.", {
          persist: true,
          variant: "error",
          preventDuplicate: true,
        });
        setErrors((prev) => [...prev, key]);
      }
    });
    socket.on("connect", () => {
      if (key) {
        closeSnackbar(key);
        setErrors((prev) => prev.filter((v) => v !== key));
        key = null;
      }
    });
    socket.on("disconnect", (e) => console.log(e));
    socket.on("state", onState);
    socket.on("notes", onNotes);
    socket.on("date", onDate);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => () => errors.forEach((key) => closeSnackbar(key)), [errors]);

  const disableSubmit = state !== "pre-submit";

  const debounced = useDebouncedCallback(
    () => socket.emit("notes", notes),
    500
  );

  console.log(errors);

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
                <IconButton
                  size="small"
                  onClick={() => socket.emit("date", dayjs())}
                >
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
                  const { data } = await postPickup({ notes });
                  enqueueSnackbar(data.message, { variant: "success" });
                } catch (e) {
                  console.error(e);
                  const key = enqueueSnackbar(
                    e.response?.data.message || e.message,
                    {
                      variant: "error",
                    }
                  );
                  setErrors((prev) => [...prev, key]);
                }
              }}
              children="SUBMIT"
            />
          </Box>
        </Box>
      </Box>
    </AppContainer>
  );
}
