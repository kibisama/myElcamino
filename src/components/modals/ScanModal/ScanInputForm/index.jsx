import * as React from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import {
  asyncInvScan,
  setMode,
  setSource,
  setCost,
  setIsUpdated,
  setStatus,
  setError,
} from "../../../../reduxjs@toolkit/scanSlice";
import CustomToggleButtonGroup from "../../../customs/CustomToggleButtonGroup";
import CurrencyInput from "../../../customs/CurrencyInput";
import ScanStatusDiagram from "./ScanStatusDiagram";
import useScanDetection from "../../../../hooks/useScanDetection";
import lasolisa from "../../../../wav/lasolisa.wav";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  top: {
    px: "36px",
  },
  bottom: {
    px: "36px",
    pb: "36px",
    display: "flex",
    justifyContent: "space-between",
  },
};

const modes = ["RECEIVE", "FILL", "REVERSE", "RETURN"];
const sources = ["CARDINAL", "SECONDARY"];
const parseDataMatrix = (dataMatrix) => {
  const gtin = dataMatrix.match(/(?<=\(01\))\d{14}/)?.[0];
  const lot = dataMatrix.match(/(?<=\(10\))([^(]{1,20})/)?.[0];
  const exp = dataMatrix.match(/(?<=\(17\))\d{6}/)?.[0];
  const sn = dataMatrix.match(/(?<=\(21\))([^(]{1,20})/)?.[0];
  return { gtin, lot, exp, sn };
};

const ScanInputForm = ({ state }) => {
  const dispatch = useDispatch();
  const handleModeChange = React.useCallback(
    (e) => dispatch(setMode(e.target.value)),
    [dispatch]
  );
  const handleSourceChange = React.useCallback(
    (e) => dispatch(setSource(e.target.value)),
    [dispatch]
  );
  const inputTimeout = React.useRef(null);
  const handleFocus = () => {
    inputTimeout.current = setTimeout(
      () => document.querySelector("input").blur(),
      5000
    );
  };
  const handleCostChange = React.useCallback(
    (e) => {
      clearTimeout(inputTimeout.current);
      dispatch(setCost(e.target.value ? "$" + e.target.value : undefined));
      handleFocus();
    },
    [dispatch]
  );
  const { mode, source, cost, isUpdated, status } = state;
  const disabled = mode !== "RECEIVE";

  const timeout = React.useRef(null);
  React.useEffect(() => {
    if (isUpdated) {
      timeout.current = setTimeout(() => {
        dispatch(setIsUpdated(false));
        dispatch(setStatus());
      }, 3000);
    }
    return () => clearTimeout(timeout.current);
  }, [dispatch, isUpdated]);
  React.useEffect(() => {
    if (status === 208) {
      new Audio(lasolisa).play();
      dispatch(setStatus());
    }
  }, [dispatch, status]);
  const onComplete = React.useCallback(
    (code) => {
      if (document.activeElement === document.querySelector("input").current) {
        return;
      }
      clearTimeout(timeout.current);
      const { gtin, lot, exp, sn } = parseDataMatrix(code);
      if (!gtin || !lot || !exp || !sn) {
        dispatch(setError(1));
        return;
      }
      const body = {
        mode,
        gtin,
        lot,
        exp,
        sn,
        source,
        cost,
      };
      dispatch(asyncInvScan(body));
    },
    [mode, source, cost, dispatch]
  );
  const onError = React.useCallback(
    (code) => {
      dispatch(setError(1));
    },
    [dispatch]
  );

  useScanDetection({
    onComplete: onComplete,
    onError: onError,
    minLength: 38,
  });

  return (
    <Box sx={style.container}>
      <Box sx={style.top}>
        <CustomToggleButtonGroup
          buttons={modes}
          value={mode}
          onChange={handleModeChange}
          exclusive
        />
      </Box>
      <ScanStatusDiagram status={state} />
      <Box sx={style.bottom}>
        <CustomToggleButtonGroup
          sx={{ width: 240 }}
          buttons={sources}
          value={source}
          onChange={handleSourceChange}
          disabled={disabled}
          exclusive
        />
        <CurrencyInput
          disabled={disabled}
          label="COST"
          onChange={handleCostChange}
          onFocus={handleFocus}
        />
      </Box>
    </Box>
  );
};

export default ScanInputForm;
