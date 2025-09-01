import React from "react";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { Box, TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AppContainer from "../AppContainer";
import { postScanInv } from "../../../../../lib/api/client";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { enqueueSnackbar as _enqueueSnackbar, closeSnackbar } from "notistack";

import QrCodeSvg from "../../../../svg/QrCode";
import LoadingSvg from "../../../../svg/Loading";
import WarningSvg from "../../../../svg/Warning";
import VerifiedSvg from "../../../../svg/Verified";
import lasolisa from "../../../../../wav/lasolisa.wav"; // for duplication
import lasomarie from "../../../../../wav/lasomarie.wav"; // for error

const parseDataMatrix = (dataMatrix) => {
  const gtin = dataMatrix.match(/(?<=\(01\))\d{14}/)?.[0];
  const lot = dataMatrix.match(/(?<=\(10\))([^(]{1,20})/)?.[0];
  const exp = dataMatrix.match(/(?<=\(17\))\d{6}/)?.[0];
  const sn = dataMatrix.match(/(?<=\(21\))([^(]{1,20})/)?.[0];
  return { gtin, lot, exp, sn };
};

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

export default function ScanInv() {
  const [mode, setMode] = React.useState("FILL");
  const [state, setState] = React.useState("standby");
  const [source, setSource] = React.useState("CARDINAL");
  const [cost, setCost] = React.useState(undefined);
  const [refresh, setRefresh] = React.useState(false);
  const disabled = mode !== "RECEIVE";

  const timeout = React.useRef(null);
  const errorKeysRef = React.useRef([]);

  const enqueueSnackbar = React.useCallback((arg1, arg2) => {
    const errorKeysArray = errorKeysRef.current;
    const key = _enqueueSnackbar(arg1, {
      ...arg2,
      onEnter: () => {
        arg2?.onEntered && arg2.onEntered();
        errorKeysArray.push(key);
      },
      onExited: () => {
        arg2?.onExited && arg2.onExited();
        errorKeysArray.splice(errorKeysArray.indexOf(key), 1);
      },
    });
  }, []);

  const onComplete = React.useCallback(
    (barcode) => {
      if (document.activeElement === document.querySelector("input").current) {
        return;
      }
      setState("updating");
      setRefresh((prev) => !prev);
      clearTimeout(timeout.current);
      const { gtin, lot, exp, sn } = parseDataMatrix(barcode);
      if (!(gtin && lot && exp && sn)) {
        setState("error");
        new Audio(lasomarie).play();
        return enqueueSnackbar("An invalid code scanned. Please try again.", {
          variant: "error",
        });
      }
      (async () => {
        try {
          const { data } = await postScanInv({
            mode,
            gtin,
            lot,
            exp,
            sn,
            source,
            cost,
          });
          if (data.code === 208) {
            new Audio(lasolisa).play();
          }
          setState("updated");
        } catch (e) {
          console.error(e);
          setState("error");
          new Audio(lasomarie).play();
          if (!e.response) {
            return enqueueSnackbar("Failed to connect to the server.", {
              variant: "error",
            });
          }
        }
      })();
    },
    [enqueueSnackbar, cost, mode, source]
  );
  useScanDetection({ onComplete });

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
  React.useEffect(() => {
    if (state === "updated") {
      timeout.current = setTimeout(() => {
        setState("standby");
      }, 3000);
    }
    return () => clearTimeout(timeout.current);
  }, [state]);
  React.useEffect(
    () => () => errorKeysRef.current.forEach((key) => closeSnackbar(key)),
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
          <StateSvg key={refresh} state={state} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ToggleButtonGroup
            disabled={disabled}
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
            disabled={disabled}
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
