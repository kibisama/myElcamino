import React from "react";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { Box, TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AppContainer from "../AppContainer";
import { postPickup } from "../../../../../lib/api/client";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { enqueueSnackbar, closeSnackbar } from "notistack";

import QrCodeSvg from "../../../../svg/QrCode";
import LoadingSvg from "../../../../svg/Loading";
import WarningSvg from "../../../../svg/Warning";
import VerifiedSvg from "../../../../svg/Verified";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
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
      thousandSeparator
      valueIsNumericString
      prefix="$ "
      fixedDecimalScale
      decimalScale={2}
    />
  );
});

const StateSvg = React.memo(({ state }) => {
  return (
    <React.Fragment>
      {state === "error" ? (
        <WarningSvg />
      ) : state === "updating" ? (
        <LoadingSvg />
      ) : state === "updated" ? (
        <VerifiedSvg />
      ) : (
        <QrCodeSvg />
      )}
    </React.Fragment>
  );
});

export default function InventoryScan() {
  const [mode, setMode] = useState("FILL");
  const [state, setState] = useState("standby");
  const [source, setSource] = useState("CARDINAL");
  const [cost, setCost] = useState(undefined);
  const onComplete = async (barcode) => {
    // if (document.activeElement.tagName !== "INPUT") {
    //   const rxNumber = barcode.match(/\d+/g);
    //   rxNumber &&
    //     socket.emit("items", {
    //       action: "push",
    //       item: rxNumber.join(""),
    //     });
    // }
  };
  useScanDetection({ onComplete });

  useEffect(() => {
    // function onState(data) {
    //   setState(data);
    // }
    // function onNotes(data) {
    //   setNotes(data);
    // }
    // function onDate(data) {
    //   setDate(data && dayjs(data));
    // }
    // const key = "APPS_PICKUP_CONNECT_ERROR";
    // socket.on("connect_error", (e) => {
    //   enqueueSnackbar("Unable to connect to the server.", {
    //     persist: true,
    //     variant: "error",
    //     key,
    //     preventDuplicate: true,
    //   });
    // });
    // socket.on("connect", () => {
    //   closeSnackbar(key);
    // });
    // socket.on("state", onState);
    // socket.on("notes", onNotes);
    // socket.on("date", onDate);
    // return () => {
    //   socket.disconnect();
    //   closeSnackbar(key);
    // };
  }, []);

  //   const errorKeys = useRef([]);
  //   useEffect(
  //     () => () => {
  //       errorKeys.current.forEach((key) => closeSnackbar(key));
  //     },
  //     []
  //   );

  const handleModeChange = React.useCallback(
    (e) => setMode(e.target.value),
    []
  );
  const handleSourceChange = React.useCallback(
    (e) => setSource(e.target.value),
    []
  );
  const inputTimeout = React.useRef(null);
  const handleFocus = React.useCallback(() => {
    inputTimeout.current = setTimeout(
      () => document.querySelector("#APPS_INVENTORYSCAN_INPUT_COST").blur(),
      5000
    );
  }, []);
  const handleCostChange = React.useCallback(
    (e) => {
      clearTimeout(inputTimeout.current);
      setCost(e.target.value ? "$" + e.target.value : undefined);
      handleFocus();
    },
    [handleFocus]
  );

  useEffect(
    () => () => {
      clearTimeout(inputTimeout.current);
    },
    []
  );

  return (
    <AppContainer>
      <Box sx={{}}>
        <ToggleButtonGroup
          color="primary"
          onChange={handleModeChange}
          value={mode}
        >
          <ToggleButton sx={{ width: 99 }} value="FILL">
            FILL
          </ToggleButton>
          <ToggleButton sx={{ width: 99 }} value="RECEIVE">
            RECEIVE
          </ToggleButton>
          <ToggleButton sx={{ width: 99 }} value="REVERSE">
            REVERSE
          </ToggleButton>
          <ToggleButton sx={{ width: 99 }} value="RETURN">
            RETURN
          </ToggleButton>
        </ToggleButtonGroup>
        <Box
          sx={{
            width: 393,
            height: 393,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StateSvg state={state} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ToggleButtonGroup
            color="primary"
            onChange={handleSourceChange}
            value={source}
          >
            <ToggleButton sx={{ width: 119 }} value="CARDINAL">
              CARDINAL
            </ToggleButton>
            <ToggleButton sx={{ width: 119 }} value="SECONDARY">
              SECONDARY
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            placeholder="Cost"
            onChange={handleCostChange}
            sx={{ width: 140 }}
            slotProps={{
              input: {
                id: "APPS_INVENTORYSCAN_INPUT_COST",
                inputComponent: NumericFormatCustom,
              },
            }}
          />
        </Box>
      </Box>
    </AppContainer>
  );
}
